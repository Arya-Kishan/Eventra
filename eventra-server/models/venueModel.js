import mongoose, { Schema } from 'mongoose'

const venueSchema = new Schema({
    title: String,
    description: String,
    pic: { url: String, public_id: String, success: Boolean },
    location: { latitude: String, longitude: String },
    address: { state: String, city: String, area: String },
    bookedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // ARRAY OF EVENT ID
    slots: [{ time: { start: String, end: String }, isBooked: Boolean, event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' } }],

}, { timestamps: true })

export const Venue = mongoose.model("Venue", venueSchema);