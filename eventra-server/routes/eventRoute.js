import express from 'express'
import { bookEvent, createEvent, deleteEvent, getAllEventByUserId, getAllEvents, getAllUpcomingEvents, getSearchedEvent, getSingleEvent, updateEvent } from '../controllers/eventController.js';
import { mixUpload } from '../middlewares/Multer.js';
const router = express.Router();

router.post("/", mixUpload, createEvent)
    .put("/:id", mixUpload, updateEvent)
    .delete("/:id", deleteEvent)
    .get("/all", getAllEvents)
    .get("/upcoming", getAllUpcomingEvents)
    .get("/all/:userId", getAllEventByUserId)
    .get("/single/:id", getSingleEvent)
    .get("/search", getSearchedEvent)
    .patch("/book/:id", bookEvent)

export default router;