import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { sendMail } from '../services/NodeMailer.js';
// import { getNewUserNotificationHtml, signUpTemplate } from '../services/Template.js';
import AsyncHandler from '../utils/AsyncHandler.js';
const jwtSecret = process.env.JWT_SECRET

export const createUser = AsyncHandler(async (req, res) => {
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
    const user = await User.findOne({ email: req.body.email });

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
    const doc = await User.findById(req.params.userId).populate({
        path: 'mychats',
        select: ["name", "online"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single user")

export const updateUser = AsyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.query);

    if (req.body.new_chat) {
        await User.findByIdAndUpdate(req.params.id, { $push: { mychats: req.body.new_chat } }, { new: true });
        await User.findByIdAndUpdate(req.body.new_chat, { $push: { mychats: req.params.id } }, { new: true });
        res.status(200).json({ data: "new user added to mychats", message: "Success" });
        return 1;
    }

    if (req.body.delete_chat) {
        await User.findByIdAndUpdate(req.params.id, { $pull: { mychats: req.body.delete_chat } }, { new: true });
        await User.findByIdAndUpdate(req.body.delete_chat, { $pull: { mychats: req.params.id } }, { new: true });
        res.status(200).json({ data: "delete from mychats", message: "Success" });
        return 1;
    }

    const doc = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating task')