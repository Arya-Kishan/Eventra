import express from 'express'
import { createVenue, deleteVenue, getAllUpcomingVenues, getAllVenueByUserId, getAllVenues, getSearchedVenue, getSingleVenue, updateVenue } from '../controllers/venueController.js';
import { mixUpload } from '../middlewares/Multer.js';
const router = express.Router();

router.post("/", mixUpload, createVenue)
    .put("/:id", updateVenue)
    .delete("/:id", deleteVenue)
    .get("/all", getAllVenues)
    .get("/upcoming", getAllUpcomingVenues)
    .get("/all/:userId", getAllVenueByUserId)
    .get("/Venue/:id", getSingleVenue)
    .get("/search", getSearchedVenue)

export default router;