import express from "express";
import {
  createMessage,
  deleteMessage,
  getConversations,
  unseenMessage,
  updateConversationMessagesSeen,
  updateMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router
  .post("/send", createMessage)
  .get("/getMessages", getConversations)
  .post("/unseenMessages", unseenMessage)
  .post("/conversation/messages", updateConversationMessagesSeen)
  .post("/updateMessage", updateMessage)
  .post("/deleteMessage", deleteMessage);

export default router;
