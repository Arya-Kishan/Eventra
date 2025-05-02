import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            size: {
                type: String,
                required: true,
                enum: ["XS", "S", "M", "L", "XL", "L"]
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },
    shippingAddress: {
        area: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        phone: String,
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'COD'],
        default: 'cod',
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
