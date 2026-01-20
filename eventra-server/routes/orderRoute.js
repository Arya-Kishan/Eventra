import express from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderByuser,
  updateOrderStatusById,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .get("/:id", getOrderByuser)
  .get("/", getAllOrders)
  .post("/", createOrder)
  .patch("/:id", updateOrderStatusById)
  .delete("/:id", deleteOrderById);

export default router;
