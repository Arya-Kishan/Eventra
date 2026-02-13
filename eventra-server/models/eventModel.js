import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    time: { start: Date, end: Date },
    date: Date,
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue" },
    pic: { url: String, public_id: String, success: Boolean },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    category: { type: String, default: null },
    headcount: { type: Number, default: 1 },
    price: { type: String, required: true, default: 1 },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "rejected", "accepted", "cancelled"],
    },
    address: {
      type: {
        area: String,
        state: String,
        country: String,
        postalCode: String,
      },
      default: {
        area: "",
        state: "",
        postalCode: "",
        country: "",
      },
      _id: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
    isCancelled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

eventSchema.index({ location: "2dsphere" });

export const Event = mongoose.model("Event", eventSchema);
