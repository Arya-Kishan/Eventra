import { PostComment } from '../models/postCommentModel.js'
import { Post } from '../models/postModel.js'
import AsyncHandler from '../utils/AsyncHandler.js';
import { updatePost } from './postController.js';

export const createPostComment = AsyncHandler(async (req, res) => {
    const { post } = req.body;
    const doc = new PostComment(req.body);
    const newDoc = await doc.save();
    const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: newDoc._id } }, { new: true }).populate({
        path: 'user',
    }).populate({
        path: 'likes',
    })
    res.status(200).json({ data: { ...newDoc.toObject(), user: updatedPost.user, likes: updatedPost.likes }, message: "Success" });
}, "error in creating PostComment")

export const getPostComments = AsyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await PostComment.find({ post: req.params.id }).populate({
        path: 'user',
        select: ["name", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting PostComments of a post")

export const updatePostComment = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await PostComment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating PostComment')


export const deletePostComment = AsyncHandler(async (req, res) => {
    const doc = await PostComment.findByIdAndDelete(req.params.id);
    const updatedPost = await Post.findByIdAndUpdate(doc.post, { $pull: { comments: doc._id } }, { new: true }).populate({
        path: 'user',
    }).populate({
        path: 'likes',
    })
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting PostComment')