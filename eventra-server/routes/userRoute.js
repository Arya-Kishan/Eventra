import express from 'express';
import { createUser, getAllUser, getLoggedInUser, getSearchedUser, getSingleUser, loginUser, updateUser } from '../controllers/userController.js';
import { mixUpload } from '../middlewares/Multer.js';

const router = express.Router();

router.post("/login", loginUser)
    .post("/signup", createUser)
    .patch("/:id", mixUpload, updateUser)
    .get("/", getAllUser)
    .get("/single/:userId", getSingleUser)
    .get("/loggedIn/:userId", getLoggedInUser)
    .get("/search", getSearchedUser)

export default router;