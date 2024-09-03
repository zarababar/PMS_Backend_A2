import express from "express";
import { createProduct, updateProduct, deleteProduct, getUserProducts, getCategoryProducts, getAllProducts, getProductsDetails } from "../Controller/product.js";
import { createCategory } from "../Controller/category.js";
import { isAuthenticated } from "../Middleware/auth.js";
import { userIdValidation, categoryIdValidation, ProductValidation, idValidation } from "../utils/validation.js";
import { handleImages } from "../Middleware/imagesAuth.js";
import { validation } from "../Middleware/validation.js";
import { upload } from "../utils/multer.js";
const router = express.Router();

router.post('/products', handleImages, isAuthenticated, ProductValidation, validation, createProduct);

router.post('/products/category', isAuthenticated, createCategory);

router.put('/products/:id',handleImages, isAuthenticated, ProductValidation, validation, updateProduct);

router.delete('/products/:id', isAuthenticated, idValidation, validation, deleteProduct)

router.get('/products/user/:userId', isAuthenticated, getUserProducts);

router.get('/products/category/:categoryId',isAuthenticated, getCategoryProducts);

router.get('/products/:id', isAuthenticated, idValidation, validation, getProductsDetails);

router.get('/products', isAuthenticated, getAllProducts);

export default router;
