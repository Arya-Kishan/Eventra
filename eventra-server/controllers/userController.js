import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { sendMail } from '../services/NodeMailer.js';
// import { getNewUserNotificationHtml, signUpTemplate } from '../services/Template.js';
import AsyncHandler from '../utils/AsyncHandler.js';
const jwtSecret = process.env.JWT_SECRET

export const createUser = AsyncHandler(async (req, res) => {
    console.log("BODY : ", req.body)
    let checkUser = await User.find({ email: req.body.email });
    if (checkUser.length > 0) {
        return res.status(400).json({ data: null, message: "Email already exist", success: false });
    }
    const newUser = await User.create(req.body);
    res.status(200).json({ data: newUser, message: "User Created", success: true });

    // await sendMail("arya12345kishan@gmail.com", "New User Join WebBook", `${newUser.name}`, getNewUserNotificationHtml(newUser.name, newUser.email))

    // await sendMail(newUser.email, "Joined WebBook", `${newUser.name}`, signUpTemplate(newUser.name));

}, "error in registering user or sending mail")

export const loginUser = AsyncHandler(async (req, res) => {
    // finding and updating users online time
    const user = await User.findOne({ email: req.body.email }).populate({ path: "chats" });

    if (req.body.password == user.password) {
        return res.status(200).json({ data: user, message: "User Found - Logined", success: true });
    } else {
        return res.status(400).json({ data: null, message: "WRONG PASSWORD" });
    }

}, "error in login user")

export const getAllUser = AsyncHandler(async (req, res) => {

    if (req.query.search) {
        const doc = await User.find({ name: { $regex: '^' + req.query.search, $options: 'i' } });
        res.status(200).json({ data: doc, message: "Success" });
        return true;
    }

    const doc = await User.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all user")

export const getSingleUser = AsyncHandler(async (req, res) => {
    const doc = await User.findByIdAndUpdate(req.params.userId, { active: new Date().toISOString() }).populate({
        path: 'chats',
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single user")

export const updateUser = AsyncHandler(async (req, res) => {

    console.log("BODY : ", req.body)
    console.log("FILES : ", req.files)

    const normalUpdates = ["name", "email", "password", "bio", "role", "FCMToken"];
    const pushUpdates = ["chats"];
    const parsedUpdates = ["address", "location"]

    const DoUpdateNormal = {};
    const DoUpdatePush = {};

    for (let key in req.body) {
        if (normalUpdates.includes(key)) {
            DoUpdateNormal[key] = parsedUpdates.includes(key) ? JSON.parse(req.body[key]) : req.body[key];
        } else {
            DoUpdatePush[key] = parsedUpdates.includes(key) ? JSON.parse(req.body[key]) : req.body[key];
        }
    }

    if (req.files.pic !== undefined) {

        const picUrl = await uploadFileToCloudinary(type, req.files);
        console.log("PIC URL : ", picUrl)
        if (picUrl.success == false) {
            throw Error("Error in Uploading Image to Cloudinary !!");
        }

        DoUpdateNormal.profilePic = picUrl;
    }

    const newUpdates = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: DoUpdateNormal,
            $push: DoUpdatePush
        },
        { new: true }
    )

    res.status(200).json({ data: newUpdates, message: "Success" });
}, 'error in updating task')