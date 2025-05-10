import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    notification_type: { type: String, default: "" },
    link: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
}, { timestamps: true })

export const Notification = mongoose.model("Notification", notificationSchema);