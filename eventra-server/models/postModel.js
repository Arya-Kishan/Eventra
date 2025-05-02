import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
    file: {
        type: {
            fileType: { type: String, default: "", enum: ["image", "video"] },
            url: { type: String, default: "" },
            public_id: { type: String, default: "" },
            _id: false
        },
        default: {}
    },
    title: { type: String },
    description: { type: String },
    tags: { type: [String], default: [""] },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'PostComments', default: [] },
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema);