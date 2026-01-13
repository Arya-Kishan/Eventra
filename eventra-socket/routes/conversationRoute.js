import express from "express";
import {
  createConversation,
  deleteConversation,
  getTotalUnseenCount,
  getUserConversations,
  updateConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router
  .post("/create", createConversation)
  .get("/user/:userId", getUserConversations)
  .get("/user/unseencount/:userId", getTotalUnseenCount)
  .put("/update", updateConversation)
  .post("/delete", deleteConversation);

export default router;
