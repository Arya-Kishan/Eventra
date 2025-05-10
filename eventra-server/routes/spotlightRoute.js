import express from 'express';
import { mixUpload } from '../middlewares/Multer.js';
import { createSpotlight, deleteSpotlight, getAllSpotlights, updateSpotlight } from '../controllers/spotlightController.js';

const router = express.Router();

router.post("/create", mixUpload, createSpotlight)
    .put("/:id", mixUpload, updateSpotlight)
    .get("/", getAllSpotlights)
    .delete("/:id", deleteSpotlight)

export default router;