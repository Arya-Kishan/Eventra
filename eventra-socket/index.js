import cors from "cors"
import 'dotenv/config'
import express from "express"
import { createServer } from 'http'
import { Server } from 'socket.io'
import { dbConnection } from "./database.js"
import messageRouter from "./routes/messageRoute.js"
const PORT = 7000;

const app = express();
const server = createServer(app);

dbConnection();

app.use(cors({
    exposedHeaders: ["x-webbook-jwt-routes"],
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

let userSocketMap = {};

export const getSocketIdByUserId = (userId) => {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {

    console.log("user connected : " + socket.id);

    const userId = socket.handshake.query.userId
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
        io.emit("onlineUsers", Object.keys(userSocketMap))
    }

    console.log(userSocketMap);

    socket.on("send-notification", ({ receiverId, category, message }) => {
        const receiverSocketId = userSocketMap[receiverId];
        io.to(receiverSocketId).emit("receive-notification", { category, message })
    })

    socket.on("send-message", (newMessage) => {
        const { sender, receiver } = newMessage;
        const receiverSocketId = userSocketMap[receiver._id];
        io.to(receiverSocketId).emit("receive-message", newMessage)
        io.to(receiverSocketId).emit("someone-messaged", newMessage)
    })

    socket.on("delivered", ({ sender, receiver, message }) => {
        const senderSocketId = userSocketMap[sender._id];
        io.to(senderSocketId).emit("receiver-received-message", { sender, receiver, message })
    })

    socket.on("send-changed-conversationType", ({ sender, receiver, conversationType }) => {
        const receiverSocketId = userSocketMap[receiver._id];
        io.to(receiverSocketId).emit("receive-changed-conversationType", { sender, receiver, conversationType })
    })

    socket.on("send-game", ({ sender, receiver, category, game, data }) => {
        console.log({ sender, receiver });
        const receiverSocketId = userSocketMap[receiver._id];
        console.log(receiverSocketId);
        io.to(receiverSocketId).emit("receive-game", { sender, receiver, category, game, data })
    })

    socket.on("send-game-notification", ({ sender, receiver, game, message, data }) => {
        const receiverSocketId = userSocketMap[receiver._id];
        console.log(receiverSocketId);
        io.to(receiverSocketId).emit("receive-game-notification", { sender, receiver, game, message, data })
    })

    socket.on("send-game-player-joined", ({ sender, receiver, category, game, data }) => {
        const receiverSocketId = userSocketMap[receiver._id];
        const senderSocketId = userSocketMap[sender._id];
        console.log(receiverSocketId);
        io.to(receiverSocketId).emit("receive-game-player-joined", { sender, receiver, category, game, data, firstTurn: receiver })
        io.to(senderSocketId).emit("receive-game-player-joined", { sender: receiver, receiver: sender, category, game, data, firstTurn: receiver })
    })

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED : " + socket.id);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })

})

app.use("/socket/message", messageRouter)

app.get("/", (req, res) => {
    res.json({ heading: 'SOCKET FOR EVENTRA' })
})


server.listen(PORT, () => {
    console.log(`SOCKET SERVER LISTENED AT : ` + PORT);
})