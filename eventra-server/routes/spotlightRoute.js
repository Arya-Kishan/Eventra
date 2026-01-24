import express from "express";
import { mixUpload } from "../middlewares/Multer.js";
import {
  createSpotlight,
  deleteSpotlight,
  getAllSpotlights,
  importSpotLightSamples,
  updateSpotlight,
} from "../controllers/spotlightController.js";

const router = express.Router();

router
  .post("/create", mixUpload, createSpotlight)
  .post("/import", importSpotLightSamples)
  .put("/:id", mixUpload, updateSpotlight)
  .get("/all", getAllSpotlights)
  .delete("/:id", deleteSpotlight);

export default router;
