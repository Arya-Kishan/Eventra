
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
    }
}, { timestamps: true });

export const UnseenMessage = mongoose.model("UnseenMessage", unseenMessageModel);