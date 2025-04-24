import express from 'express'
import { createVenue, deleteVenue, getAllUpcomingVenues, getAllVenueByUserId, getAllVenues, getSearchedVenue, getSingleVenue, updateVenue } from '../controllers/venueController.js';
import { mixUpload } from '../middlewares/Multer.js';
const router = express.Router();

router.post("/", mixUpload, createVenue)
    .patch("/:id", mixUpload, updateVenue)
    .delete("/:id", deleteVenue)
    .get("/all", getAllVenues)
    .get("/upcoming", getAllUpcomingVenues)
    .get("/all/:userId", getAllVenueByUserId)
    .get("/single/:id", getSingleVenue)
    .get("/search", getSearchedVenue)

export default router;