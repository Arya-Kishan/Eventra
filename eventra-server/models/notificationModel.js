import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ["like", "comment", "booking"] },
    message: { type: { title: String, description: String }, required: true, _id: false },
    link: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
}, { timestamps: true })

export const Notification = mongoose.model("Notification", notificationSchema);