import { Venue } from '../models/venueModel.js'
import { uploadFileToCloudinary } from '../services/Cloudinary.js';
import AsyncHandler from '../utils/AsyncHandler.js';

export const createVenue = AsyncHandler(async (req, res) => {

    const { slots, address, location } = req.body;

    const picUrl = await uploadFileToCloudinary("image", req.files);
    if (picUrl.success == false) {
        throw Error("Error in Uploading Image to Cloudinary !!");
    }

    const doc = new Venue({ ...req.body, pic: picUrl, slots: JSON.parse(slots), location: JSON.parse(location), address: JSON.parse(address) });
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating Venue")

export const updateVenue = AsyncHandler(async (req, res) => {

    const normalUpdates = ["title", "description", "host", "pic", "location", "address"];
    const pushUpdates = ["bookedEvents", "slots", "reviews"];

    const DoUpdateNormal = {};
    const DoUpdatePush = {};

    for (let key in req.body) {
        if (normalUpdates.includes(key)) {
            DoUpdateNormal[key] = req.body[key];
        } else {
            DoUpdatePush[key] = JSON.parse(req.body[key]);
        }
    }

    const newUpdates = await Venue.findByIdAndUpdate(
        req.params.id,
        {
            $set: DoUpdateNormal,
            $push: DoUpdatePush
        },
        { new: true }
    )

    res.status(200).json({ data: newUpdates, message: "Success" });

}, 'error in updating Venue')

export const deleteVenue = AsyncHandler(async (req, res) => {
    const doc = await Venue.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Venue")

export const getAllVenueByUserId = AsyncHandler(async (req, res) => {
    const doc = await Venue.find({ host: req.params.userId }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user Venue")

export const getAllVenues = AsyncHandler(async (req, res) => {
    const doc = await Venue.find().populate({
        path: 'host'
    }).populate({
        path: 'bookedEvents',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all Venues")

export const getAllUpcomingVenues = AsyncHandler(async (req, res) => {
    console.log("GETTING ALL UPCOMING VenueS")
    const now = new Date();
    const futureVenues = await Venue.find({ date: { $gt: now } }).sort({ date: 1 }).populate({
        path: 'venue'
    }).populate({
        path: 'participants',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: futureVenues, message: "Success" });
}, "error in getting all upcoming Venue")

export const getSingleVenue = AsyncHandler(async (req, res) => {
    const doc = await Venue.findById(req.params.id).populate({
        path: 'host',
        select: ["name", "email", "bio", "profilePic"]
    }).populate({
        path: 'bookedEvents',
    }).populate({
        path: 'slots',
    }).populate({
        path: 'reviews.user',
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single Venue")

export const getSearchedVenue = AsyncHandler(async (req, res) => {

    const { word } = req.query;

    const regex = new RegExp('^' + word, 'i');

    const Venues = await Venue.find({ title: { $regex: regex } });

    res.status(200).json({ data: Venues, message: "Success" });

}, "error in getting searched Venue")