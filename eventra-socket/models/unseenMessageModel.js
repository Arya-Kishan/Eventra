
import mongoose from "mongoose";

const unseenMessageModel = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: { type: String, default: "text" },
        value: { type: String, default: "" },
    },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "sent", enum: ["sent", "delivered"] },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export const UnseenMessage = mongoose.model("UnseenMessage", unseenMessageModel);