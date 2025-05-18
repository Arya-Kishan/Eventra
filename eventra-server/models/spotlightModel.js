import mongoose, { Schema } from 'mongoose'

const spotlightSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pic: { url: String, public_id: String },
    category: { type: String, enum: ["event", "venue", "product", "post"], default: "event", _id: false },
    categoryId: String
}, { timestamps: true })

export const Spotlight = mongoose.model("Spotlight", spotlightSchema);