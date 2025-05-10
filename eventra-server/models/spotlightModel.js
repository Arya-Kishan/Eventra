import mongoose, { Schema } from 'mongoose'

const spotlightSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pic: { url: "", public_id: "" },
    categoryType: { type: String, enum: ["event", "venue"], default: "event", _id: false },
}, { timestamps: true })

export const Spotlight = mongoose.model("Spotlight", spotlightSchema);