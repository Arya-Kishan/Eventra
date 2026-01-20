import express from "express";
import {
  createOtpUser,
  deleteOtpUser,
  updateOtpUser,
  verfyUserOtp,
} from "../controllers/otpController.js";

const router = express.Router();

router
  .post("/verify", verfyUserOtp)
  .post("/create", createOtpUser)
  .patch("/:id", updateOtpUser)
  .delete("/:id", deleteOtpUser);

export default router;
