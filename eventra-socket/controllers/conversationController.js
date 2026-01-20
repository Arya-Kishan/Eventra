import mongoose from "mongoose";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const updateConversationCount = async (
  conversationId,
  userId,
  type = "count",
) => {
  try {
    const updatedConversation = await Conversation.updateOne(
      { _id: conversationId },
      type === "count"
        ? { $inc: { [`unseenCount.${userId}`]: 1 } }
        : { $set: { [`unseenCount.${userId}`]: 0 } },
    );
    return { success: true, data: updatedConversation, error: null };
  } catch (error) {
    return { success: false, data: null, error };
  }
};

export const createConversation = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    console.log("body", req.body);

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [],
        unseenCount: {
          [sender]: 0,
          [receiver]: 0,
        },
      });
    }

    const data = await conversation.populate(
      "participants",
      "name email profilePic",
    );

    console.log(data);

    return res.status(200).json({
      message: "MESSAGE SAVED",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "ERROR IN CREATING CONVERSATION",
      data: null,
    });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("GETTING CONVERSATION BEFORE: ", userId);

    const data = await Conversation.find({
      participants: { $in: [userId] },
    }).populate({
      path: "participants",
      select: ["name", "email", "profilePic", "active"],
    });

    console.log("GETTING CONVERSATION AFTER: ", userId);

    res.status(200).json({ message: "GETTING CONVERSATION", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "ERROR IN GETTING USER CONVERSATIONS",
      data: null,
    });
  }
};

export const updateConversation = async (req, res) => {
  try {
    let { conversationId, userId, type } = req.body;
    console.log(req.body);

    const { data, success, error } = await updateConversationCount(
      conversationId,
      userId,
      type,
    );

    if (!success) throw Error(error);

    res.status(200).json({ message: "UPDATED MESSAGE", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "ERROR IN UPDATING CONVERSATION COUNT",
      data: null,
    });
  }
};

export const deleteConversation = async (req, res) => {
  let { messageId, type } = req.body;

  let updatedMessage;

  if (type == "solo") {
    updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { message: "deleted..." },
      { new: true },
    );
  }

  console.log(updatedMessage);

  res.status(200).json({ message: "UPDATED MESSAGE", data: updatedMessage });
};

export const getTotalUnseenCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await Conversation.aggregate([
      // 1️⃣ Match conversations where user is a participant
      {
        $match: {
          participants: { $in: [userObjectId] },
        },
      },

      // 2️⃣ Convert unseenCount object → array
      {
        $project: {
          unseenArray: { $objectToArray: "$unseenCount" },
        },
      },

      // 3️⃣ Extract unseen count for this user
      {
        $project: {
          unseenValue: {
            $let: {
              vars: {
                matched: {
                  $filter: {
                    input: "$unseenArray",
                    as: "item",
                    cond: { $eq: ["$$item.k", userId] },
                  },
                },
              },
              in: {
                $ifNull: [{ $arrayElemAt: ["$$matched.v", 0] }, 0],
              },
            },
          },
        },
      },

      // 4️⃣ Sum all unseen counts
      {
        $group: {
          _id: null,
          totalUnseen: { $sum: "$unseenValue" },
        },
      },
    ]);

    console.log("RESULT : ", result);

    res.status(200).json({
      success: true,
      totalUnseen: result[0]?.totalUnseen || 0,
    });
  } catch (error) {
    console.error("ERROR IN UNSEEN COUNT API:", error);
    res.status(500).json({
      success: false,
      totalUnseen: 0,
    });
  }
};
