import { Product } from '../models/productModel.js'
import { uploadFileToCloudinary } from '../services/Cloudinary.js';
import AsyncHandler from '../utils/AsyncHandler.js';

export const createProduct = AsyncHandler(async (req, res) => {

    // const picUrl = await uploadFileToCloudinary("image", req.files);
    // if (picUrl.success == false) {
    //     throw Error("Error in Uploading Image to Cloudinary !!");
    // }

    // const doc = new Product({ ...req.body, pic: picUrl });
    const doc = new Product(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating Product")

export const updateProduct = AsyncHandler(async (req, res) => {

    const normalUpdates = ["title", "description", "price", "pic", "discountPercentage", "rating", "stock", "brand", "category"];

    const DoUpdateNormal = {};
    const DoUpdatePush = {};

    for (let key in req.body) {
        if (normalUpdates.includes(key)) {
            DoUpdateNormal[key] = req.body[key];
        }
    }

    const newUpdates = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: DoUpdateNormal
        },
        { new: true }
    )

    res.status(200).json({ data: newUpdates, message: "success" });

}, 'error in updating Product')

export const deleteProduct = AsyncHandler(async (req, res) => {
    const doc = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting Product")

export const getAllProducts = AsyncHandler(async (req, res) => {
    const doc = await Product.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all Products")

export const getSingleProduct = AsyncHandler(async (req, res) => {
    const doc = await Product.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single Product")

export const getSearchedProduct = AsyncHandler(async (req, res) => {

    const { word } = req.query;

    const regex = new RegExp('^' + word, 'i');

    const Products = await Product.find({ title: { $regex: regex } });

    res.status(200).json({ data: Products, message: "success" });

}, "error in getting searched Product")

export const getCategoryProduct = AsyncHandler(async (req, res) => {

    console.log("GETTING ALL CATEGORY PRODUCT");
    const { category } = req.query;

    const Products = await Product.find({ category: category });

    res.status(200).json({ data: Products, message: "success" });

}, "error in getting searched Product")