import { Venue } from "../models/venueModel.js";
import { uploadFileToCloudinary } from "../services/Cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const allowed_distance = process.env.BUSINESS_DISTANCE;

export const createVenue = AsyncHandler(async (req, res) => {
  const { slots, address, location } = req.body;

  const picUrl = await uploadFileToCloudinary("image", req.files);
  if (picUrl.success == false) {
    throw Error("Error in Uploading Image to Cloudinary !!");
  }

  const doc = new Venue({
    ...req.body,
    pic: picUrl,
    slots: JSON.parse(slots),
    location: JSON.parse(location),
    address: JSON.parse(address),
  });
  const newDoc = await doc.save();
  res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating Venue");

export const updateVenue = AsyncHandler(async (req, res) => {
  const normalUpdates = [
    "title",
    "description",
    "host",
    "pic",
    "location",
    "address",
  ];
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
      $push: DoUpdatePush,
    },
    { new: true },
  );

  res.status(200).json({ data: newUpdates, message: "Success" });
}, "error in updating Venue");

export const deleteVenue = AsyncHandler(async (req, res) => {
  const doc = await Venue.findByIdAndDelete(req.params.id);
  res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Venue");

export const getAllVenueByUserId = AsyncHandler(async (req, res) => {
  const doc = await Venue.find({ host: req.params.userId })
    .populate({
      path: "venue",
    })
    .populate({
      path: "participants",
      select: ["name", "email", "bio", "profilePic"],
    })
    .populate({
      path: "host",
      select: ["name", "email", "bio", "profilePic"],
    });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user Venue");

export const getAllVenues = AsyncHandler(async (req, res) => {
  const radius = allowed_distance;

  const { lat, lng, type = "all", word } = req.query;
  let allVenues = null;

  if (type == "all") {
    allVenues = await Venue.find()
      .populate({
        path: "host",
      })
      .populate({
        path: "bookedEvents",
        select: ["name", "email", "bio", "profilePic"],
      });
  }

  if (type == "nearBy") {
    allVenues = await Venue.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "dist.calculated",
          maxDistance: Number(radius) * 1000, // km → meters
          spherical: true,
          query: {},
        },
      },

      // 🔹 Populate host
      {
        $lookup: {
          from: "users", // collection name
          localField: "host",
          foreignField: "_id",
          as: "host",
        },
      },
      {
        $unwind: {
          path: "$host",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 🔹 Populate bookedEvents WITH selected fields
      {
        $lookup: {
          from: "events",
          localField: "bookedEvents",
          foreignField: "_id",
          as: "bookedEvents",
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1,
                bio: 1,
                profilePic: 1,
              },
            },
          ],
        },
      },

      // 🔹 Sort by distance
      {
        $sort: { "dist.calculated": 1 },
      },
    ]);
  }

  if (type == "search") {
    const regex = new RegExp("^" + word, "i");
    allVenues = await Venue.find({ title: { $regex: regex } });
  }

  res.status(200).json({ data: allVenues, message: "Success", success: true });
}, "error in getting all Venues");

export const getSingleVenue = AsyncHandler(async (req, res) => {
  const doc = await Venue.findById(req.params.id)
    .populate({
      path: "host",
      select: ["name", "email", "bio", "profilePic"],
    })
    .populate({
      path: "bookedEvents",
    })
    .populate({
      path: "slots",
    })
    .populate({
      path: "reviews.user",
    });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single Venue");

export const getSearchedVenue = AsyncHandler(async (req, res) => {
  const { word } = req.query;

  const regex = new RegExp("^" + word, "i");

  const Venues = await Venue.find({ title: { $regex: regex } });

  res.status(200).json({ data: Venues, message: "Success" });
}, "error in getting searched Venue");

export const bulkAdd = AsyncHandler("/users/bulk", async (req, res) => {
  try {
    const usersArray = req.body; // array of objects

    if (!Array.isArray(usersArray)) {
      return res.status(400).json({ message: "Expected an array" });
    }

    const result = await Venue.insertMany(usersArray);

    res.status(201).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
