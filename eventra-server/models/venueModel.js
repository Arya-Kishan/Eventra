import mongoose, { Schema } from "mongoose";

const venueSchema = new Schema(
  {
    title: String,
    description: String,
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pic: { url: String, public_id: String, success: Boolean },
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
    bookedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: [],
      },
    ], // ARRAY OF EVENT ID
    slots: [
      {
        time: { start: String, end: String },
        isBooked: Boolean,
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      },
    ],
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          comment: String,
          star: { type: String, default: "0" },
          createdAt: { type: Date, default: Date.now, _id: false },
        },
      ],
      default: [],
      _id: false,
    },
    price: { type: String, required: true, default: 1 },
  },
  { timestamps: true }
);

venueSchema.index({ location: "2dsphere" });

export const Venue = mongoose.model("Venue", venueSchema);
