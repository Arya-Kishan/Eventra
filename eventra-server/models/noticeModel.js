import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, default: "" },
    viewedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    priority: {
      type: String,
      enum: ["warning", "success", "info", "report"],
    },
    type: { type: String, enum: ["user", "global"], default: "global" },
    targetUserId: { type: mongoose.Schema.Types.ObjectId || null, ref: "User" },
  },
  { timestamps: true },
);

export const Notice = mongoose.model("Notice", noticeSchema);
