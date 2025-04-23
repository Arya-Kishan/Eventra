import mongoose, { Schema } from 'mongoose'

const venueSchema = new Schema({
    title: String,
    description: String,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pic: { url: String, public_id: String, success: Boolean },
    location: { latitude: String, longitude: String },
    address: { state: String, city: String, area: String },
    bookedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: [] }], // ARRAY OF EVENT ID
    slots: [{ time: { start: String, end: String }, isBooked: Boolean, event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' } }],
    reviews: { type: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }], default: [], _id: false },
    price: { type: String, required: true, default: 1 },
}, { timestamps: true })

export const Venue = mongoose.model("Venue", venueSchema);