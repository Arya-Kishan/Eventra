import express from "express";
import { getLoggedInUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/loggedIn/:userId", getLoggedInUser);

export default router;
