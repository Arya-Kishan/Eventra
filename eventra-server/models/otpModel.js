import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    codeHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otpType: {
      type: String,
      enum: ["email", "phone"],
      default: "email",
      required: true,
    },
  },
  { timestamps: true },
);

export const Otp = mongoose.model("Otp", otpSchema);
