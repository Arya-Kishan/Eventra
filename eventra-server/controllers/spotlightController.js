import { Spotlight } from '../models/spotlightModel.js'
import { uploadFileToCloudinary } from '../services/Cloudinary.js';
import AsyncHandler from '../utils/AsyncHandler.js';

export const createSpotlight = AsyncHandler(async (req, res) => {

    const picUrl = await uploadFileToCloudinary("image", req.files);
    if (picUrl.success == false) {
        throw Error("Error in Uploading Image to Cloudinary !!");
    }

    const doc = new Spotlight({ ...req.body, pic: picUrl });
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating Spotlight")

export const updateSpotlight = AsyncHandler(async (req, res) => {

    console.log("BODY : ", req.body)
    console.log("FILES : ", req.files)

    const normalUpdates = ["title", "description", "categoryType"];
    const pushUpdates = ["", ""];
    const parsedUpdates = ["", ""];

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

    const newUpdates = await Spotlight.findByIdAndUpdate(
        req.params.id,
        {
            $set: DoUpdateNormal,
            $push: DoUpdatePush
        },
        { new: true }
    )

    res.status(200).json({ data: newUpdates, message: "Success" });

}, 'error in updating Spotlight')

export const deleteSpotlight = AsyncHandler(async (req, res) => {
    const doc = await Spotlight.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Spotlight")

export const getAllSpotlights = AsyncHandler(async (req, res) => {
    const doc = await Spotlight.find().populate({
        path: 'host'
    }).populate({
        path: 'bookedEvents',
        select: ["name", "email", "bio", "profilePic"]
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all Spotlights")