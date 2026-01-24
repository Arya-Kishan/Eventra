import cors from "cors";
import "dotenv/config";
import express from "express";
import { dbConnection } from "./config/database.js";
import eventRoutes from "./routes/eventRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import orderRoute from "./routes/orderRoute.js";
import otpRoute from "./routes/otpRoute.js";
import postCommentRoute from "./routes/postCommentRoute.js";
import postRoutes from "./routes/postRoute.js";
import productRoute from "./routes/productRoute.js";
import spotlightRoute from "./routes/spotlightRoute.js";
import userRoutes from "./routes/userRoute.js";
import venueRoutes from "./routes/venueRoute.js";
import bannerRoutes from "./routes/bannerRoute.js";
import noticeRoutes from "./routes/noticeRoute.js";

const server = express();

server.use(
  cors({
    exposedHeaders: ["x-webbook-jwt-routes", "x-total-count"],
  }),
);
server.use(express.json({ limit: "50kb" }));
server.use(express.urlencoded({ extended: true }));

dbConnection();

server.use("/user", userRoutes);
server.use("/event", eventRoutes);
server.use("/venue", venueRoutes);
server.use("/post", postRoutes);
server.use("/postComment", postCommentRoute);
server.use("/product", productRoute);
server.use("/order", orderRoute);
server.use("/notification", notificationRoute);
server.use("/spotLight", spotlightRoute);
server.use("/otp", otpRoute);
server.use("/banner", bannerRoutes);
server.use("/notice", noticeRoutes);

server.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ data: null, message: err.message || "something went wrong" });
});

server.listen(8000, () => {
  console.log("SERVER LISTENED AT 8000");
});
