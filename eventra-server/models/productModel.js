import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    category: String,
    pic: { url: String, public_id: String },
    sizes: { type: [String], default: ["XS", "S", "L", "XL"] }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);