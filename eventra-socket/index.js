import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  saveMessage,
  updateConversationMessages,
} from "./controllers/messageController.js";
import { dbConnection } from "./database.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import conversationRouter from "./routes/conversationRoute.js";
import sendNotificationFCM from "./services/FirebaseFCM.js";
import { updateConversationCount } from "./controllers/conversationController.js";
import sendChatNotificationFCM from "./services/FirebaseFCM.js";
import { User } from "./models/userModel.js";
const PORT = 9000;

const app = express();
const server = createServer(app);

dbConnection();

app.use(
  cors({
    exposedHeaders: ["x-webbook-jwt-routes"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

export let userSocketMap = {};
export let userActiveChats = {};

export const getSocketIdByUserId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const FCMToken = socket.handshake.query.FCMToken;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    userActiveChats[userId] = null;
    io.emit("onlineUsers", Object.keys(userSocketMap));
    updateConversationMessages({
      conversationId: null,
      userId,
      type: "deliveredAt",
    });
  }

  socket.on("send-message", async (newMessage) => {
    const { sender, receiver, message, conversationId } = newMessage;
    console.log("NEW MESSAGE : ", newMessage);
    const onlineUsers = Object.keys(userSocketMap);
    const isOpponentOnline = onlineUsers.includes(receiver._id);
    const isOpponentSeeingChat =
      userActiveChats[receiver._id] == conversationId;
    console.log({ isOpponentOnline, isOpponentSeeingChat });
    const messageData = {
      sender: sender?._id,
      receiver: receiver._id,
      message: {
        type: message.type,
        value: message.value,
      },
      ...(isOpponentOnline && { deliveredAt: new Date().toISOString() }),
      ...(isOpponentSeeingChat && { seenAt: new Date().toISOString() }),
      conversationId,
    };

    const { success, data: savedMessage } = await saveMessage(messageData);
    if (!success) return;
    console.log("USER ACTIVE CHAT MAP", userActiveChats);
    const receiverSocketId = userSocketMap[receiver._id];
    const senderSocketId = userSocketMap[sender._id];
    const messageStatus =
      isOpponentOnline && isOpponentSeeingChat
        ? "seen"
        : isOpponentOnline
          ? "delivered"
          : "saved";
    // RECEIVE MESSAGE TO OPPONENT
    io.to(receiverSocketId).emit("receive-message", {
      ...savedMessage,
      ...newMessage,
    });
    // MESSAGE STATUS TO SENDER
    io.to(senderSocketId).emit("message-status", {
      messageData: { ...savedMessage, ...newMessage },
      messageStatus: messageStatus,
    });
    console.log({ isOpponentOnline, isOpponentSeeingChat });
    // UNSEEN MESSAGE TO RECEIVER
    if (isOpponentOnline && !isOpponentSeeingChat) {
      io.to(receiverSocketId).emit("unseen-message", {
        ...newMessage,
        conversationId,
      });
      await updateConversationCount(conversationId, receiver._id, "count");
    }
    if (!isOpponentOnline) {
      await updateConversationCount(conversationId, receiver._id, "count");
      const userDetail = await User.findById(receiver._id);
      console.log("USER DETAILS : ", userDetail);

      sendChatNotificationFCM({
        title: `${sender.name} messaged you`,
        body: message.value,
        deviceToken: userDetail.FCMToken,
        feature: "chat",
        link: `/chat/message/${conversationId}`,
      });
    }
  });

  socket.on("chat-mode", async (data) => {
    const receiverSocketId = userSocketMap[data.receiverId];
    io.to(receiverSocketId).emit("chat-mode", data);
  });

  socket.on("bubble-emit", async (data) => {
    const receiverSocketId = userSocketMap[data.receiver._id];
    console.log("buuble listen", data);
    io.to(receiverSocketId).emit("bubble-listen", data);
  });

  socket.on("incognito-send-message", async (newMessage) => {
    const receiverSocketId = userSocketMap[newMessage.receiver._id];
    io.to(receiverSocketId).emit("incognito-receive-message", newMessage);
  });

  socket.on("delivered", ({ sender, receiver, message }) => {
    const senderSocketId = userSocketMap[sender._id];
    io.to(senderSocketId).emit("receiver-received-message", {
      sender,
      receiver,
      message,
    });
  });

  socket.on(
    "active_chat",
    async ({ chatId, currentUser, receiver, type = "active" }) => {
      userActiveChats[currentUser._id] = type == "active" ? chatId : null;
      const receiverSocketId = userSocketMap[receiver._id];
      io.to(receiverSocketId).emit("receive-active-chat", {
        chatId,
        currentUser,
        receiver,
        type,
      });
      await updateConversationCount(chatId, currentUser._id, "seen"); // UPDATING CONVERSATION COUNT TO 0
      type == "active" &&
        (await updateConversationMessages({
          conversationId: chatId,
          userId: receiver._id,
          type: "seenAt",
        })); // UPDATING ALL MESSAGES TO BE SEENED BY SUER
    },
  );

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    delete userActiveChats[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/socket/message", messageRouter);
app.use("/user", userRouter);
app.use("/socket/conversation", conversationRouter);

app.get("/", (req, res) => {
  res.json({ heading: "SOCKET FOR EVENTRA" });
});

app.post("/sendNotification", (req, res) => {
  const {
    user,
    title,
    body,
    feature,
    action,
    docId,
    link,
    isRead,
    deviceToken,
  } = req.body;
  console.log(req.body);

  const onlineUsers = Object.keys(userSocketMap);
  const receiverSocketId = userSocketMap[user];

  if (onlineUsers.includes(user)) {
    io.to(receiverSocketId).emit("receive-notification", {
      user,
      title,
      body,
      feature,
      action,
      docId,
      link,
      isRead,
    });
    console.log("SENDING NOTIFICATIN SOCKET");
    res.json({ isOnline: true });
  } else {
    sendNotificationFCM(deviceToken, title, body, feature, link);
    console.log("SENDING NOTIFICATIN FCM");
    res.json({ isOnline: false });
  }
});

server.listen(PORT, () => {
  console.log(`SOCKET SERVER LISTENED AT : ` + PORT);
});
