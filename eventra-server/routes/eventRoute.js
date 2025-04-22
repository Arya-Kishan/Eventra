import express from 'express'
import { createEvent, deleteEvent, getAllEventByUserId, getAllEvents, getAllUpcomingEvents, getSearchedEvent, getSingleEvent, updateEvent } from '../controllers/eventController.js';
import { mixUpload } from '../middlewares/Multer.js';
const router = express.Router();

router.post("/", mixUpload, createEvent)
    .put("/:id", updateEvent)
    .delete("/:id", deleteEvent)
    .get("/all", getAllEvents)
    .get("/upcoming", getAllUpcomingEvents)
    .get("/all/:userId", getAllEventByUserId)
    .get("/event/:id", getSingleEvent)
    .get("/search", getSearchedEvent)

export default router;