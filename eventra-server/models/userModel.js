import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePic: { type: { url: String, public_id: String }, default: { url: "", public_id: "" }, _id: false },
    role: { type: String, enum: ["admin", "user", "organiser"], default: "user" },
    FCMToken: { type: String, default: "" },
    address: {
        type: {
            area: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
            phone: String,
        },
        default: {
            area: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
        },
        _id: false
    },
    location: { type: { latitude: String, longitude: String }, default: { latitude: "", longitude: "" }, _id: false },
    chats: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    active: { type: Date, default: Date.now }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);