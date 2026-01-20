import { Otp } from "../models/otpModel.js";
import { User } from "../models/userModel.js";
import { sendMail } from "../services/NodeMailer.js";
import { HTMLOtpTemplate } from "../services/Template.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";

export const createOtpUser = AsyncHandler(async (req, res) => {
  const { userId, email, name } = req.body;
  console.log("BODY : ", req.body);

  const oldOtp = await Otp.findOne({ user: userId });
  console.log("OLD OTP : ", oldOtp);
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = await bcrypt.hash(otpCode, 10);
  const newOtp = {
    codeHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    attempts: 0,
    verified: false,
    user: userId,
    type: "email",
  };

  if (oldOtp) {
    await sendMail(
      email,
      `Your verification code for Eventra`,
      `${email}`,
      HTMLOtpTemplate(otpCode, name),
    );
    await Otp.findByIdAndUpdate(oldOtp._id, newOtp);
    return res.status(200).json({
      data: null,
      error: null,
      success: true,
      message: "OTP Created",
    });
  }

  const result = new Otp(newOtp);
  await sendMail(
    email,
    `Your verification code for Eventra`,
    `${email}`,
    HTMLOtpTemplate(otpCode, name),
  );
  const newotp = await result.save();
  return res.status(200).json({
    data: null,
    error: null,
    success: true,
    message: "OTP Created",
  });
}, "error in creating otp");

export const verfyUserOtp = AsyncHandler(async (req, res) => {
  const { user, code } = req.body;
  const otp = await Otp.findOne({ user: user });

  if (!otp) {
    return res.status(400).json({
      data: null,
      error: null,
      success: false,
      message: "Request a new OTP/ Otp Expired",
    });
  }

  const isExpired = otp.expiresAt < new Date();
  if (isExpired) {
    await Otp.findByIdAndDelete(otp._id);
    return res.status(400).json({
      data: null,
      error: null,
      success: false,
      message: "OTP has Expired",
    });
  }

  const isValid = await bcrypt.compare(code, otp.codeHash);

  if (!isValid) {
    return res.status(400).json({
      data: null,
      error: null,
      success: false,
      message: "Invalid OTP",
    });
  }

  await User.findByIdAndUpdate(user, { isEmailVerified: true });

  return res.status(200).json({
    data: null,
    error: null,
    success: true,
    message: "OTP verified",
  });
}, "error in verifying otp of user");

export const updateOtpUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const doc = await Otp.findByIdAndUpdate(
    id,
    { status: req.body.status },
    { new: true },
  )
    .populate("user")
    .populate("item");
  res.status(200).json(doc);
}, "error in updating otp");

export const deleteOtpUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Otp.findByIdAndDelete(id);
  res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting otp");
