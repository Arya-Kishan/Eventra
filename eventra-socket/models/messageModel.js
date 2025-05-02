
import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: { type: String, default: "text" },
        value: { type: String, default: "" },
    }
}, { timestamps: true });

export const Message = mongoose.model("Message", messageModel);