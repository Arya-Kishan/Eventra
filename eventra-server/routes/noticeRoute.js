import express from "express";
import {
  createNotice,
  deleteNotice,
  getAllNotice,
  getNoticeByUserId,
  updateNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

// Create
router.post("/", createNotice);

// Read all
router.get("/all", getAllNotice);

// Read one by ID
router.get("/:id", getNoticeByUserId);

// Update by ID
router.put("/:id", updateNotice);

// Delete by ID
router.delete("/:id", deleteNotice);

export default router;
