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
import authMiddleware from "./middlewares/auth_middleware.js";
import jwt from "jsonwebtoken";

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
server.use("/event", authMiddleware, eventRoutes);
server.use("/venue", authMiddleware, venueRoutes);
server.use("/post", authMiddleware, postRoutes);
server.use("/postComment", authMiddleware, postCommentRoute);
server.use("/product", authMiddleware, productRoute);
server.use("/order", authMiddleware, orderRoute);
server.use("/notification", authMiddleware, notificationRoute);
server.use("/spotLight", authMiddleware, spotlightRoute);
server.use("/otp", authMiddleware, otpRoute);
server.use("/banner", authMiddleware, bannerRoutes);
server.use("/notice", authMiddleware, noticeRoutes);

server.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ data: null, message: err.message || "something went wrong" });
});

const decoded = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjM5NjYzYmQwYTA3ZDUxM2IwZDIxYyIsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJpYXQiOjE3NzAyMjg2NDEsImV4cCI6MTc3MDgzMzQ0MX0.ZwZsRhGSgKI2OLjcRYpUcaCEyto221CamwoiD8YtAM8",
  process.env.JWT_SECRET,
);
console.log("DECODED : ", decoded);

server.listen(8000, () => {
  console.log("SERVER LISTENED AT 8000");
});
