import { Banner } from "../models/bannerModel.js";

export const createSample = async (req, res) => {
  try {
    const data = req.body;

    const sample = await Banner.create(data);

    return res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create resource",
      error: error.message,
    });
  }
};

export const getAllSamples = async (req, res) => {
  try {
    const samples = await Banner.find();

    return res.status(200).json({
      success: true,
      message: "Resources fetched successfully",
      data: samples,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
      error: error.message,
    });
  }
};

export const getSampleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sample = await Banner.findById(id);

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resource",
      error: error.message,
    });
  }
};

export const updateSample = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const sample = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

export const deleteSample = async (req, res) => {
  try {
    const { id } = req.params;

    const sample = await Banner.findByIdAndDelete(id);

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};
