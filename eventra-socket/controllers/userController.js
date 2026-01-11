import AsyncHandler from "../../eventra-server/utils/AsyncHandler.js";
import { User } from "../models/userModel.js";

export const getLoggedInUser = AsyncHandler(async (req, res) => {
  const doc = await User.findByIdAndUpdate(req.params.userId, {
    active: new Date().toISOString(),
  }).populate({
    path: "chats",
  });
  res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single user");
