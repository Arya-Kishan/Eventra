import mongoose, { Schema } from "mongoose";

const bannerSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Banner = mongoose.model("Banner", bannerSchema);
