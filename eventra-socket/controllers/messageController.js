import { getSocketIdByUserId, io } from "../index.js";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { UnseenMessage } from "../models/unseenMessageModel.js";

export const saveMessage = async ({ sender, receiver, message }) => {
  try {
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

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      conversationId: conversation._id,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // 🔥 INCREMENT UNSEEN COUNT
    // await Conversation.updateOne(
    //   { _id: conversation._id },
    //   {
    //     $inc: { [`${receiver}`]: 1 },
    //   }
    // );

    const receiverSocketId = getSocketIdByUserId(receiver);

    return { newMessage, success: true, error: null };
  } catch (err) {
    console.log("ERROR IN SAVING MESSAGE : ", err);
    return { newMessage: null, success: false, error: err };
  }
};

export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, message, deliveredAt, seenAt, conversationId } =
      req.body;

    const { newMessage, success, error } = await saveMessage({
      sender,
      receiver,
      message,
      deliveredAt,
      seenAt,
      conversationId,
    });

    if (!success) throw Error(error);

    return res.status(200).json({
      message: "MESSAGE SAVED",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "ERROR IN CREATING MESSAGE",
      data: null,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    let { sender, receiver } = req.query;

    let getConversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate({
      path: "messages",
      populate: [
        {
          path: "sender",
          select: "name",
        },
        {
          path: "receiver",
          select: "name",
        },
      ],
    });

    res
      .status(200)
      .json({ message: "GETTING CONVERSATION", data: getConversation });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "ERROR IN CREATING NEW CONVERSATION OR MESSAGE",
      data: null,
    });
  }
};

export const unseenMessage = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.query);

    if (req.query.type == "get") {
      let doc = await UnseenMessage.find({ receiver: req.body.receiver })
        .populate({
          path: "sender",
          select: ["name", "email", "bio", "profilePic"],
        })
        .populate({
          path: "receiver",
          select: ["name", "email", "bio", "profilePic"],
        });

      return res
        .status(200)
        .json({ message: "GETTING UNSEEN MESSAGE ", data: doc });
    } else if (req.query.type == "delete") {
      console.log(req.body);

      await UnseenMessage.deleteMany({ receiver: req.body.receiver });

      return res.status(200).json({
        message: "DELETED UNSEEN MESSAGE FROM BACKEND",
        data: "apple",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "ERROR IN ADDING UNSEEN MESSAGE", data: null });
  }
};

export const updateMessage = async (req, res) => {
  let { messageId, type, newMessage } = req.body;
  console.log(req.body);

  let updatedMessage;

  if (type == "solo") {
    updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { message: newMessage },
      { new: true }
    );
  }

  console.log(updatedMessage);

  res.status(200).json({ message: "UPDATED MESSAGE", data: updatedMessage });
};

export const deleteMessage = async (req, res) => {
  let { messageId, type } = req.body;

  let updatedMessage;

  if (type == "solo") {
    updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { message: "deleted..." },
      { new: true }
    );
  }

  console.log(updatedMessage);

  res.status(200).json({ message: "UPDATED MESSAGE", data: updatedMessage });
};
