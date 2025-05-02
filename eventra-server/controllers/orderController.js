import { Order } from "../models/orderModel.js"
// import { Product } from "../models/productModel.js"
import AsyncHandler from "../utils/AsyncHandler.js"

export const createOrder = AsyncHandler(async (req, res) => {

    const order = new Order(req.body);

    const newOrder = await order.save();
    res.status(200).json(newOrder);

}, "error in creating order")

export const getOrderByuser = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const doc = await Order.find({ user: id }).populate('item');
    res.status(200).json(doc);
}, "error in getting order of user")

export const getAllOrders = AsyncHandler(async (req, res) => {

    let query = Order.find({}).populate('item');

    if (req.query.sort) {
        query = query.find().sort({ date: +req.query.sort })
    }
    const doc = await query.exec();
    res.status(200).json(doc);

}, "error in getting all orders")

export const updateOrderStatusById = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    if (req.body.status == 'delivered') {
        console.log(req.body.itemsId);
        // for (let item of req.body.itemsId) {
        //     const product = await Product.findById(item.item)
        //     product.stock = product.stock - item.quantity
        //     await product.save()
        //     console.log(product);
        // }
    }


    const doc = await Order.findByIdAndUpdate(id, { status: req.body.status }, { new: true }).populate('user').populate('item');
    res.status(200).json(doc);

}, "error in updating order")

export const deleteOrderById = AsyncHandler(async (req, res) => {

    const { id } = req.params;
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json({ data: doc, message: "Success" });

}, "error in deleting order")