import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { dbConnection } from "./database.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import sendNotificationFCM from "./services/FirebaseFCM.js";
import axios from "axios";
const PORT = 9000;

const app = express();
const server = createServer(app);

dbConnection();

app.use(
  cors({
    exposedHeaders: ["x-webbook-jwt-routes"],
  })
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
  console.log("user connected : " + socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocketMap));
  }

  console.log("USER SOCKET MAP", userSocketMap);

  socket.on("send-message", async (newMessage) => {
    const { sender, receiver, message } = newMessage;
    const receiverSocketId = userSocketMap[receiver._id];
    io.to(receiverSocketId).emit("receive-message", newMessage);
    io.to(receiverSocketId).emit("someone-messaged", newMessage);
    const onlineUsers = Object.keys(userSocketMap);
    if (!onlineUsers.includes(receiver._id)) {
      const { data } = await axios.get(
        `${process.env.SERVER_BASE_URL}/user/single/${receiver._id}`
      );
      console.log("USER DETAILS", data);

      sendNotificationFCM(
        receiver.FCMToken,
        `${sender.name} messaged you`,
        message.value,
        "chat",
        ""
      );
    }
  });

  socket.on("delivered", ({ sender, receiver, message }) => {
    const senderSocketId = userSocketMap[sender._id];
    io.to(senderSocketId).emit("receiver-received-message", {
      sender,
      receiver,
      message,
    });
  });

  socket.on("active_chat", ({ chatId, receiver, type = "active" }) => {
    const receiverSocketId = userSocketMap[receiver._id];
    io.to(receiverSocketId).emit("chat_status", {
      chatId: type == "active" ? chatId : null,
    });
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED : " + socket.id);
    delete userSocketMap[userId];
    delete userActiveChats[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/socket/message", messageRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ heading: "SOCKET FOR EVENTRA" });
});

app.post("/sendNotification", (req, res) => {
  const { user, title, body, notification_type, link, isRead, deviceToken } =
    req.body;
  console.log(req.body);

  const onlineUsers = Object.keys(userSocketMap);
  const receiverSocketId = userSocketMap[user];

  if (onlineUsers.includes(user)) {
    io.to(receiverSocketId).emit("receive-notification", {
      user,
      title,
      body,
      notification_type,
      link,
      isRead,
    });
    console.log("SENDING NOTIFICATIN SOCKET");
    res.json({ isOnline: true });
  } else {
    sendNotificationFCM(deviceToken, title, body, notification_type, link);
    console.log("SENDING NOTIFICATIN FCM");
    res.json({ isOnline: false });
  }
});

server.listen(PORT, () => {
  console.log(`SOCKET SERVER LISTENED AT : ` + PORT);
});
