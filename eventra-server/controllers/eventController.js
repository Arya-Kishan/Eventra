import { Event } from "../models/eventModel.js";
import { User } from "../models/userModel.js";
import { Venue } from "../models/venueModel.js";
import { uploadFileToCloudinary } from "../services/Cloudinary.js";
import sendNotification from "../services/FirebaseFCM.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const allowed_distance = process.env.BUSINESS_DISTANCE;

export const createEvent = AsyncHandler(async (req, res) => {
  const { venue, time } = req.body;

  const picUrl = await uploadFileToCloudinary("image", req.files);
  if (picUrl.success == false) {
    throw Error("Error in Uploading Image to Cloudinary !!");
  }

  const doc = new Event({
    ...req.body,
    pic: picUrl,
    time: JSON.parse(req.body.time),
    location: JSON.parse(req.body.location),
    address: JSON.parse(req.body.address),
  });
  const newDoc = await doc.save();
  await Venue.findOneAndUpdate(
    {
      _id: venue,
      "slots.time.start": JSON.parse(time).start,
      "slots.time.end": JSON.parse(time).end,
    },
    {
      $set: {
        "slots.$.isBooked": true,
        "slots.$.event": newDoc._id,
      },
      $push: {
        bookedEvents: newDoc._id,
      },
    },
    { new: true },
  );
  res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating Event");

export const updateEvent = AsyncHandler(async (req, res) => {
  console.log(req.body);

  const normalUpdates = [
    "title",
    "description",
    "date",
    "host",
    "headcount",
    "status",
    "price",
    "category",
  ];
  const pushUpdates = ["participants"];
  const parsedUpdates = ["time"];

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

  if (req.files.pic !== undefined) {
    const picUrl = await uploadFileToCloudinary(type, req.files);
    console.log("PIC URL : ", picUrl);
    if (picUrl.success == false) {
      throw Error("Error in Uploading Image to Cloudinary !!");
    }

    DoUpdateNormal.profilePic = picUrl;
  }

  const newUpdates = await Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: DoUpdateNormal,
      $push: DoUpdatePush,
    },
    { new: true },
  )
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

  res.status(200).json({ data: newUpdates, message: "Success" });
}, "error in updating Event");

export const deleteEvent = AsyncHandler(async (req, res) => {
  const doc = await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Event");

export const getAllEventByUserId = AsyncHandler(async (req, res) => {
  const doc = await Event.find({ host: req.params.userId })
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
}, "error in getting user Event");

export const getAllEvents = AsyncHandler(async (req, res) => {
  const radius = allowed_distance;

  const { lat, lng, type = "all", word } = req.query;
  console.log("QUERY", req.query);
  let allEvents = null;

  if (type == "all") {
    allEvents = await Event.find()
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
  }

  if (type == "nearBy") {
    allEvents = await Event.aggregate([
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
      // 🔹 Populate venue
      {
        $lookup: {
          from: "venues",
          localField: "venue",
          foreignField: "_id",
          as: "venue",
        },
      },
      {
        $unwind: {
          path: "$venue",
          preserveNullAndEmptyArrays: true,
        },
      },
      // 🔹 Populate host
      {
        $lookup: {
          from: "users",
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
      // 🔹 Populate participants
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
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
    allEvents = await Event.find({ title: { $regex: regex } });
  }

  console.log(allEvents);

  res.status(200).json({ data: allEvents, message: "Success", success: true });
}, "error in getting all Venues");

export const getAllUpcomingEvents = AsyncHandler(async (req, res) => {
  const now = new Date();
  const futureEvents = await Event.find({ date: { $gt: now } })
    .sort({ date: 1 })
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
  res.status(200).json({ data: futureEvents, message: "Success" });
}, "error in getting all upcoming Event");

export const getSingleEvent = AsyncHandler(async (req, res) => {
  const doc = await Event.findById(req.params.id)
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
}, "error in getting single Event");

export const getSearchedEvent = AsyncHandler(async (req, res) => {
  const { word } = req.query;

  const regex = new RegExp("^" + word, "i");

  const events = await Event.find({ title: { $regex: regex } });

  res.status(200).json({ data: events, message: "Success" });
}, "error in getting searched Event");

export const bookEvent = AsyncHandler(async (req, res) => {
  console.log(req.body);

  const { participant, host } = req.body;

  const newUpdates = await Event.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { participants: participant },
    },
    { new: true },
  )
    .populate({
      path: "venue",
    })
    .populate({
      path: "participants",
      select: ["name", "email", "bio", "profilePic", "FCMToken"],
    })
    .populate({
      path: "host",
      select: ["name", "email", "bio", "profilePic", "FCMToken"],
    });

  console.log("newUpdates : ", newUpdates);

  const updateUser = await User.findByIdAndUpdate(
    participant,
    {
      $addToSet: { joinedEvents: newUpdates._id },
    },
    { new: true },
  );

  console.log("updateUser : ", updateUser);

  await Promise.all([
    sendNotification({
      user: newUpdates.host._id,
      title: "New Booking 💕",
      body: `${updateUser.name} made a booking - ${newUpdates.title} Event`,
      feature: "event",
      action: "booking",
      docId: newUpdates._id,
      link: `/event/booking/${newUpdates._id}`,
      deviceToken: newUpdates.host.FCMToken,
    }),

    sendNotification({
      user: updateUser._id,
      title: "New Booking 💕",
      body: `You made a booking - ${newUpdates.title} Event`,
      feature: "event",
      action: "booking",
      docId: newUpdates._id,
      link: `/event/booking/${newUpdates._id}`,
      deviceToken: updateUser.FCMToken,
    }),
  ]);

  res.status(200).json({ data: newUpdates, message: "Success" });
}, "error in updating Event");
