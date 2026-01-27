import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../services/Cloudinary.js";
import sendNotificationToUsersArr from "../services/FirebaseFCM.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const createPost = AsyncHandler(async (req, res) => {
  console.log("body data : ", req.body);
  console.log("files data : ", req.files);
  // return res.status(200).json({ data: "", message: "Success" });

  const { type, tags, event } = req.body;

  if (req.files !== undefined) {
    const picUrl = await uploadFileToCloudinary(type, req.files);
    console.log("PIC URL : ", picUrl);
    if (picUrl.success == false) {
      throw Error("Error in Uploading Image to Cloudinary !!");
    }

    const parsedEvent = event == "null" ? JSON.parse(event) : event;
    const doc = await Post.create({
      ...req.body,
      tags: JSON.parse(tags),
      event: parsedEvent,
      file: { ...picUrl, fileType: type },
    });
    return res.status(200).json({ data: doc, message: "Success" });
  }

  return res.status(400).json({ data: null, message: "File Not Provided" });
}, "error in making new post");

export const getUserPosts = AsyncHandler(async (req, res) => {
  const doc = await Post.find({ user: req.params.id })
    .populate({
      path: "user",
    })
    .populate({
      path: "likes",
    });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts");

export const getSinglePost = AsyncHandler(async (req, res) => {
  const doc = await Post.findById(req.params.id)
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "likes",
      select: "name",
    });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts");

export const getAllPosts = AsyncHandler(async (req, res) => {
  let query = Post.find();
  let totalQuery = Post.find();
  let queryArr = [];

  const queryLength = Object.keys(req.query).length;

  if (queryLength > 2 && req.query.tags) {
    if (req.query.tags) {
      queryArr.push({ tags: { $in: req.query?.tags?.split(",") } });
    }

    query = query.find({ $and: queryArr });
    totalQuery = totalQuery.find({ $and: queryArr });
  } else {
    query = query.find();
    totalQuery = totalQuery.find();
  }

  const doc = await query
    .populate({
      path: "user",
    })
    .populate({
      path: "likes",
    })
    .sort({ createdAt: req.query.sort ? Number(req.query.sort) : 1 })
    .skip(req.query.limit * (req.query.page - 1))
    .limit(req.query.limit);
  let totalDocs = await totalQuery.countDocuments();
  res.set("x-total-count", totalDocs);
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all posts");

export const updatePost = AsyncHandler(async (req, res) => {
  // console.log("BODY : ", req.body)
  // console.log("QUERY : ", req.query)
  // return res.status(200).json({ data: "arya", message: "Success" });

  if (req.query && req.query.category == "likes" && req.query.type == "add") {
    let updatedDoc = await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.body?.likes } },
      { new: true },
    )
      .populate({
        path: "user",
      })
      .populate({
        path: "likes",
      });

    sendNotificationLiked(updatedDoc.user._id, req.body.likes, updatedDoc._id);

    return res.status(200).json({ data: updatedDoc, message: "Success" });
  }

  if (
    req.query &&
    req.query.category == "likes" &&
    req.query.type == "delete"
  ) {
    let updatedDoc = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.body?.likes } },
      { new: true },
    )
      .populate({
        path: "user",
      })
      .populate({
        path: "likes",
      });
    return res.status(200).json({ data: updatedDoc, message: "Success" });
  }

  const normalUpdates = ["title", "description", "event", "tags"];
  const pushUpdates = ["likes"];
  const parsedUpdates = ["tags"];

  const DoUpdateNormal = {};
  const DoUpdatePush = {};

  for (let key in req.body) {
    if (normalUpdates.includes(key)) {
      DoUpdateNormal[key] = parsedUpdates.includes(key)
        ? JSON.parse(req.body[key])
        : req.body[key];
    } else {
      DoUpdatePush[key] = parsedUpdates.includes(key)
        ? JSON.parse(req.body[key])
        : req.body[key];
    }
  }

  const newUpdates = await Venue.findByIdAndUpdate(
    req.params.id,
    {
      $set: DoUpdateNormal,
      $push: DoUpdatePush,
    },
    { new: true },
  )
    .populate({
      path: "user",
    })
    .populate({
      path: "likes",
    });

  res.status(200).json({ data: newUpdates, message: "Success" });
}, "error in updating post");

// have to delete image urlo from cloudinary
export const deletePost = AsyncHandler(async (req, res) => {
  if (req.query.public_id) {
    await deleteFileFromCloudinary(req.query.public_id);
    const doc = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
  } else {
    const doc = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
  }
}, "error in deleting post");

const sendNotificationLiked = async (user, likedBy, postId) => {
  try {
    const likedByUser = await User.findById(likedBy);

    const now = new Date();
    sendNotificationToUsersArr({
      title: `${likedByUser.name} liked your post`,
      body: `${now.toISOString()}`,
      action: "like",
      docId: postId,
      feature: "post",
      link: `/post/like/${postId}`,
      userIdArr: [user],
    });
  } catch (error) {
    console.log("ERROR IN NOTIFICATION OF LIKED");
    console.log(error);
  }
};
