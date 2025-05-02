import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getCategoryProduct, getSearchedProduct, getSingleProduct, updateProduct } from '../controllers/productController.js';
import { mixUpload } from '../middlewares/Multer.js';
const router = express.Router();

router.post("/", mixUpload, createProduct)
    .patch("/:id", mixUpload, updateProduct)
    .delete("/:id", deleteProduct)
    .get("/all", getAllProducts)
    .get("/single/:id", getSingleProduct)
    .get("/search", getSearchedProduct)
    .get("/category", getCategoryProduct)

export default router;