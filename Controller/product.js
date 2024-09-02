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
import { validationResult } from "express-validator";
export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, userId } = req.body;
        const imageFiles = req.files;  // Use req.file.path if multer saved the file locally
        const imageUrl = imageFiles.map(file => file.path);
        const productExist = await Product.exists({ name }); // For checking existence
        if (productExist) {
            return res.status(400).json({ message: "Product already exist" });
        }

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
        const { name, description, price, category, userId } = req.body;
        const imageFiles = req.files;  // Use req.file.path if multer saved the file locally
        const imageUrl = imageFiles.map(file => file.path);

        const productExist = await Product.findOne({ _id:  new mongoose.Types.ObjectId(id) }); // Check if the product exists

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
        const productExist = await Product.findById(productId); // Check if the product exists

        if (!productExist) {
            return res.status(404).json({ message: "Product not found" }); // Return if product is not found
        }

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
        const result = await getUserProductsService(userId); // Await the service call

        //Different user cannot get the products
        if (userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: Kindly login to access the products.' });
        }
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
        // const categoryExist = await Product.findById(categoryId); // Check if the product exists

        // if (!categoryExist) {
        //     return res.status(404).json({ message: "Product not found" }); // Return if product is not found
        // }
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