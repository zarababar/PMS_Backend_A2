import Product from "../Model/product.js";
import mongoose from "mongoose";
import {
    createProductService,
    updateProductService,
    deleteProductService,
    getUserProductsService,
    getCategoryProductsService,
    getProductsDetailsService,
    getAllProductsService,

} from "../Services/product.js";
import { authorizeProductUpdate, validateUserRight, validateUserRightOnProduct } from "../utils/validation.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;
        const imageFiles = req.files;  // Use req.file.path if multer saved the file locally
        const imageUrl = imageFiles.map(file => file.path);
        const productExist = await Product.exists({ name }); // For checking existence
        if (productExist) {
            return res.status(400).json({ message: "Product already exist" });
        }
        const userId = req.user.id;

        const result = await createProductService({ name, description, price, imageUrl, category, userId });

        res.status(201).json({
            data: result // result will already be in DTO format
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id; // Get product ID from the route parameter
        const { name, description, price, category } = req.body;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }
        const imageFiles = req.files;  // Use req.file.path if multer saved the file locally
        const imageUrl = imageFiles.map(file => file.path);

        await validateUserRightOnProduct(id, userId);

        const productData = { name, description, price, category, imageUrl, userId }; // Get the product data from the request body
        const result = await updateProductService(id, productData, req.user.id); // Await the service call

        res.status(200).json({
            data: result // Return the updated product in DTO format
        });
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id; // Get product ID from the route parameter
        await validateUserRightOnProduct(productId, req.user.id);
        const result = await deleteProductService(productId); // Await the service call

        res.status(200).json({
            data: result // Return the updated product in DTO format
        });
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any
    }
}

export const getUserProducts = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Get product ID from the route parameter

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        //Different user cannot get the products
        await validateUserRight(req.user.id, userId);

        const result = await getUserProductsService(userId); // Await the service call

        res.status(200).json({
            data: result // Return the updated product in DTO format
        });
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any
    }
}

export const getCategoryProducts = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const result = await getCategoryProductsService(categoryId);
        res.status(200).json({
            data: result // Return the result
        });


    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any

    }
}

export const getProductsDetails = async (req, res, next) => {
    try {
        const productId = req.params.id;

        await authorizeProductUpdate(productId, req.user.id);
        const result = await getProductsDetailsService(productId);
        res.status(200).json({
            data: result // Return the result
        });

    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any

    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const result = await getAllProductsService();
        res.status(200).json({
            data: result // Return the result
        });

    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any

    }
}