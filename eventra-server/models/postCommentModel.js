import mongoose, { Schema } from 'mongoose'

const PostCommentSchema = new Schema({
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
}, { timestamps: true })

export const PostComment = mongoose.model("PostComment", PostCommentSchema);