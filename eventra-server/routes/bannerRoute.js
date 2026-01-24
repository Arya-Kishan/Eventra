import express from "express";
import {
  createSample,
  deleteSample,
  getAllSamples,
  getSampleById,
  updateSample,
} from "../controllers/bannerController.js";

const router = express.Router();

// Create
router.post("/", createSample);

// Read all
router.get("/all", getAllSamples);

// Read one by ID
router.get("/:id", getSampleById);

// Update by ID
router.put("/:id", updateSample);

// Delete by ID
router.delete("/:id", deleteSample);

export default router;
