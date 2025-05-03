import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { dbConnection } from './config/database.js'
import userRoutes from './routes/userRoute.js'
import eventRoutes from './routes/eventRoute.js'
import venueRoutes from './routes/venueRoute.js'
import postRoutes from './routes/postRoute.js'
import productRoute from './routes/productRoute.js'
import postCommentRoute from './routes/PostCommentRoute.js'
import orderRoute from './routes/orderRoute.js'
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

server.get("/", (req, res) => {
    const token = "eQg8te-sSrqWGqyXEnzzaU:APA91bEHBBTS6Nik_13ETKvd34voHgrmQWc-L1zmVZ6F5w6fdzxRvIDa26qZLhYOu1ji45IAAYP4QaPn1n7kcZv13gzCnc3ZFUyMs22urApgwySjPBH3oR8"
    sendNotificationFCM(token, "Test", "Hii Its All Good");
    res.json({ name: "MADE BY ARYA KISHAN WEBBOOK MULTI SAGA" });
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ data: null, message: err.message || "something went wrong" });
})

server.listen(8000, () => {
    console.log("SERVER LISTENED AT 8000");
})