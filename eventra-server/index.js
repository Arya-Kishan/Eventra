import cors from "cors";
import "dotenv/config";
import express from "express";
import { dbConnection } from "./config/database.js";
import eventRoutes from "./routes/eventRoute.js";
import orderRoute from "./routes/orderRoute.js";
import postCommentRoute from "./routes/postCommentRoute.js";
import postRoutes from "./routes/postRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import venueRoutes from "./routes/venueRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import spotlightRoute from "./routes/spotlightRoute.js";
import sendNotification from "./services/FirebaseFCM.js";

const server = express();

server.use(
  cors({
    exposedHeaders: ["x-webbook-jwt-routes", "x-total-count"],
  })
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

server.get("/", (req, res) => {
  sendNotification(
    "e_eAAs45QM-C4YUQA5WIN3:APA91bHiAaSaIB9w_p-GHud6IGIDIxPeasuw0N6XUsS6uvDBfpG7SoTzTGnVTO-S1s_vLx_DRCfIDgTDwmNU_CJlCw9OzXXt-ch29TYyW9gfIndqD1TxSd4",
    "68027b81ecf0300d691eaf8a",
    "Hello",
    "I AM ARYA KISHAN",
    "like",
    "/ProfileScreen/6803247f6bb78d648f11e2d9"
  );
  res.json({
    owner:
      "MADE BY ARYA KISHAN EVENTRA BACKEND SERVER FOR REACT NATIVE APP EVENTRA 😊💕",
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ data: null, message: err.message || "something went wrong" });
});

server.listen(8000, () => {
  console.log("SERVER LISTENED AT 8000");
});
