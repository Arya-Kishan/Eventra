import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import { User } from "../models/userModel.js";
import { sendMail } from "../services/NodeMailer.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadFileToCloudinary } from "../services/Cloudinary.js";
const jwtSecret = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

export const createUser = AsyncHandler(async (req, res) => {
  console.log("BODY : ", req.body);
  let checkUser = await User.find({
    $or: [{ email: req.body.email }, { name: req.body.name }],
  });
  if (checkUser.length > 0) {
    return res.status(400).json({
      data: null,
      message: "User with this email or name already exists",
      success: false,
    });
  }
  const newUser = await User.create(req.body);
  res
    .status(200)
    .json({ data: newUser, message: "User Created", success: true });

  // await sendMail("arya12345kishan@gmail.com", "New User Join WebBook", `${newUser.name}`, getNewUserNotificationHtml(newUser.name, newUser.email))

  // await sendMail(newUser.email, "Joined WebBook", `${newUser.name}`, signUpTemplate(newUser.name));
}, "error in registering user or sending mail");

export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password, authType } = req.body;

  const user = await User.findOne({ email }).populate("chats");

  if (!user) {
    return res.status(404).json({
      data: null,
      message: "User not found",
      success: false,
    });
  }

  // Google authentication
  if (authType === "google") {
    return res.status(200).json({
      data: user,
      message: "User logged in successfully",
      success: true,
    });
  }

  // Manual authentication
  if (authType === "manual") {
    if (password !== user.password) {
      return res.status(401).json({
        data: null,
        message: "Incorrect password",
        success: false,
      });
    }

    return res.status(200).json({
      data: user,
      message: "User logged in successfully",
      success: true,
    });
  }

  // Invalid auth type
  return res.status(400).json({
    data: null,
    message: "Invalid authentication type",
    success: false,
  });
}, "Error in login user");

export const getAllUser = AsyncHandler(async (req, res) => {
  if (req.query.search) {
    const doc = await User.find({
      name: { $regex: "^" + req.query.search, $options: "i" },
    });
    res.status(200).json({ data: doc, message: "Success" });
    return true;
  }

  const doc = await User.find();
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all user");

export const getSingleUser = AsyncHandler(async (req, res) => {
  const doc = await User.findById(req.params.userId).populate({
    path: "chats",
  });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single user");

export const updateUser = AsyncHandler(async (req, res) => {
  console.log("BODY : ", req.body);
  console.log("param : ", req.params);
  console.log("FILES : ", req.files);

  const normalUpdates = [
    "name",
    "email",
    "password",
    "bio",
    "role",
    "FCMToken",
    "address",
    "location",
    "fullName",
  ];
  const pushUpdates = ["chats", "joinedEvents"];
  const parsedUpdates = ["address", "location"];

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

  if (req.files && req.files?.image !== undefined) {
    const picUrl = await uploadFileToCloudinary("image", req.files);
    console.log("PIC URL : ", picUrl);
    if (picUrl.success == false) {
      throw Error("Error in Uploading Image to Cloudinary !!");
    }

    DoUpdateNormal.profilePic = picUrl;
  }

  const newUpdates = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: DoUpdateNormal,
      $push: DoUpdatePush,
    },
    { new: true },
  );

  res.status(200).json({ data: newUpdates, message: "Success", success: true });
}, "error in updating user");

export const getLoggedInUser = AsyncHandler(async (req, res) => {
  const doc = await User.findByIdAndUpdate(req.params.userId, {
    active: new Date().toISOString(),
  }).populate({
    path: "chats",
  });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single user");

export const getSearchedUser = AsyncHandler(async (req, res) => {
  console.log(req.query);

  const { word } = req.query;

  const regex = new RegExp("^" + word, "i");

  const Users = await User.find({ name: { $regex: regex } });

  res.status(200).json({ data: Users, message: "success" });
}, "error in getting searched Product");

export const verifyGoogleToken = AsyncHandler(async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_WEB_CLIENT_ID,
  });

  return res.status(200).json({
    data: {
      name: ticket.getPayload()?.name,
      email: ticket.getPayload()?.email,
      picture: ticket.getPayload()?.picture,
      email_verified: ticket.getPayload()?.email_verified,
    },
    message: "User Found",
    success: true,
  });
}, "error in verifying user google token");
