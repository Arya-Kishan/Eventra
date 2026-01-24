import { Notice } from "../models/noticeModel.js";

export const createNotice = async (req, res) => {
  try {
    const data = req.body;

    const sample = await Notice.create(data);

    return res.status(201).json({
      success: true,
      message: "notice created successfully",
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create notice",
      error: error.message,
    });
  }
};

export const getAllNotice = async (req, res) => {
  const { userId } = req.query;

  try {
    console.log("apple 1");
    const notices = await Notice.find({
      viewedBy: { $ne: userId },
    });

    return res.status(200).json({
      success: true,
      message: "notices fetched successfully",
      data: notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
      error: error.message,
    });
  }
};

export const getNoticeByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const sample = await Notice.find({ targetUserId: id });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notice",
      error: error.message,
    });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const sample = await Notice.findByIdAndUpdate(
      id,
      { $addToSet: { viewedBy: userId } }, // avoids duplicates
    );

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "notice updated successfully",
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update notice",
      error: error.message,
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const sample = await Notice.findByIdAndDelete(id);

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "notice deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete notice",
      error: error.message,
    });
  }
};
