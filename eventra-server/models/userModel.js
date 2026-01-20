import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    fullName: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    authType: { type: String, enum: ["manual", "google"], default: "manual" },
    isEmailVerified: { type: Boolean, default: false },
    profilePic: {
      type: { url: String, public_id: String },
      default: {
        url: "https://i.pinimg.com/736x/bc/ae/40/bcae40bb96e5ff390403d415ae7c457d.jpg",
        public_id: "",
      },
      _id: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "organiser"],
      default: "user",
    },
    FCMToken: { type: String, default: "" },
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
    chats: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    active: { type: Date, default: Date.now },
    joinedEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Event",
      default: [],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
