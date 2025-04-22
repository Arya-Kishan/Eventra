import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    bio: { type: String },
    profilePic: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    FCMToken: { type: String },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);