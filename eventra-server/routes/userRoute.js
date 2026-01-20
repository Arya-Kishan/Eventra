import express from "express";
import {
  createUser,
  getAllUser,
  getLoggedInUser,
  getSearchedUser,
  getSingleUser,
  loginUser,
  updateUser,
  verifyGoogleToken,
} from "../controllers/userController.js";
import { mixUpload } from "../middlewares/Multer.js";

const router = express.Router();

router
  .post("/login", loginUser)
  .post("/signup", createUser)
  .post("/verifyGoogleToken", verifyGoogleToken)
  .patch("/:id", mixUpload, updateUser)
  .get("/", getAllUser)
  .get("/single/:userId", getSingleUser)
  .get("/loggedIn/:userId", getLoggedInUser)
  .get("/search", getSearchedUser);

export default router;
