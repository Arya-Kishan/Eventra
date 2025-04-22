import { Event } from '../models/eventModel.js'
import { uploadFileToCloudinary } from '../services/Cloudinary.js';
import AsyncHandler from '../utils/AsyncHandler.js';

export const createEvent = AsyncHandler(async (req, res) => {

    const picUrl = await uploadFileToCloudinary("image", req.files);
    if (picUrl.success == false) {
        throw Error("Error in Uploading Image to Cloudinary !!");
    }

    const doc = new Event({ ...req.body, pic: picUrl, time: JSON.parse(req.body.time) });
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating Event")

export const updateEvent = AsyncHandler(async (req, res) => {
    const doc = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    await createEventNotification(doc);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating Event')

export const deleteEvent = AsyncHandler(async (req, res) => {
    const doc = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Event")

export const getAllEventByUserId = AsyncHandler(async (req, res) => {
    const doc = await Event.find({ host: req.params.userId }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user Event")

export const getAllEvents = AsyncHandler(async (req, res) => {
    const doc = await Event.find().populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all Events")

export const getAllUpcomingEvents = AsyncHandler(async (req, res) => {
    console.log("GETTING ALL UPCOMING EVENTS")
    const now = new Date();
    const futureEvents = await Event.find({ date: { $gt: now } }).sort({ date: 1 }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: futureEvents, message: "Success" });
}, "error in getting all upcoming Event")

export const getSingleEvent = AsyncHandler(async (req, res) => {
    const doc = await Event.findById(req.params.id).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single Event")

export const getSearchedEvent = AsyncHandler(async (req, res) => {

    const { word } = req.query;

    const regex = new RegExp('^' + word, 'i');

    const events = await Event.find({ title: { $regex: regex } }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });

    res.status(200).json({ data: events, message: "Success" });

}, "error in getting searched Event")