import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { dbConnection } from './config/database.js'
import eventRoutes from './routes/eventRoute.js'
import orderRoute from './routes/orderRoute.js'
import postCommentRoute from './routes/postCommentRoute.js'
import postRoutes from './routes/postRoute.js'
import productRoute from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import venueRoutes from './routes/venueRoute.js'
import notificationRoute from './routes/notificationRoute.js'
import sendNotificationFCM from './services/FirebaseFCM.js'

const server = express();

server.use(cors({
    exposedHeaders: ["x-webbook-jwt-routes", "x-total-count"],
}));
server.use(express.json({ limit: '50kb' }));
server.use(express.urlencoded({ extended: true }));

dbConnection();

server.use("/user", userRoutes)
server.use("/event", eventRoutes)
server.use("/venue", venueRoutes)
server.use("/post", postRoutes)
server.use("/postComment", postCommentRoute)
server.use("/product", productRoute)
server.use("/order", orderRoute)
server.use("/notification", notificationRoute)

server.get("/", (req, res) => {
    sendNotificationFCM(
        "cBfhRS4lSCKMsfP2k0sxvv:APA91bFY3KtD0sjCoT4MUU8wRL413jDd0uwOY6N4GkCQviJcPlw_Nmt-0onwQRs2lJbmfcUjlZWFK92SAZkxr56xZhLkRkAoVIrMcbe7Np_vJM8LvTBZAbw",
        "6803247f6bb78d648f11e2d9",
        "Hello",
        "I AM ARYA KISHAN",
        "like",
        "/ProfileScreen/6803247f6bb78d648f11e2d9"
    )
    res.json({ owner: "MADE BY ARYA KISHAN EVENTRA BACKEND SERVER FOR REACT NATIVE APP EVENTRA 😊💕" });
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ data: null, message: err.message || "something went wrong" });
})

server.listen(8000, () => {
    console.log("SERVER LISTENED AT 8000");
})