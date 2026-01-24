import { Spotlight } from "../models/spotlightModel.js";
import { uploadFileToCloudinary } from "../services/Cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const createSpotlight = AsyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const picUrl = await uploadFileToCloudinary("image", req.files);
  if (picUrl.success == false) {
    throw Error("Error in Uploading Image to Cloudinary !!");
  }

  const doc = new Spotlight({ ...req.body, pic: picUrl });
  const newDoc = await doc.save();
  res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating Spotlight");

export const updateSpotlight = AsyncHandler(async (req, res) => {
  console.log("BODY : ", req.body);
  console.log("FILES : ", req.files);

  const normalUpdates = ["title", "description", "categoryType", "isApproved"];
  const pushUpdates = ["", ""];
  const parsedUpdates = ["", ""];

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

  if (req.files && req.files.pic !== undefined) {
    const picUrl = await uploadFileToCloudinary(type, req.files);
    console.log("PIC URL : ", picUrl);
    if (picUrl.success == false) {
      throw Error("Error in Uploading Image to Cloudinary !!");
    }

    DoUpdateNormal.profilePic = picUrl;
  }

  const newUpdates = await Spotlight.findByIdAndUpdate(
    req.params.id,
    {
      $set: DoUpdateNormal,
      $push: DoUpdatePush,
    },
    { new: true },
  );

  res.status(200).json({ data: newUpdates, message: "Success" });
}, "error in updating Spotlight");

export const deleteSpotlight = AsyncHandler(async (req, res) => {
  const doc = await Spotlight.findByIdAndDelete(req.params.id);
  res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Spotlight");

export const getAllSpotlights = AsyncHandler(async (req, res) => {
  console.log("GETTING ALL SPOTLIGHTS");
  const doc = await Spotlight.find().sort({
    createdAt: -1,
  });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all Spotlights");

export const importSpotLightSamples = async (req, res) => {
  try {
    const documents = req.body;

    // Basic validation
    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array",
      });
    }

    // Insert documents in bulk
    const result = await Spotlight.insertMany(documents, {
      ordered: true, // continue even if some docs fail
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: "Documents imported successfully",
      insertedCount: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to import documents",
      error: error.message,
    });
  }
};
