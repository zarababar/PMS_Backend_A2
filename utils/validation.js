import { check, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Product from '../Model/product.js';
export const SignupValidation = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
]
export const LoginValidation = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    check('password')
        .notEmpty().withMessage('Password is required')
]

// Validation rules for creating a product
export const ProductValidation = [
    check('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    check('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),

    check('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a positive number'),

    check('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),

];

// Validation rule for checking ObjectId parameters
export const idValidation = [
    param('id')
        .isMongoId().withMessage('Invalid product ID')
];

export const userIdValidation = [
    // param('userId')
    //     .isMongoId().withMessage('Invalid user ID')
        check('userId')
        .isMongoId().withMessage('Invalid user ID')

    
];

export const categoryIdValidation = [
    param('category')
        .isMongoId().withMessage('Invalid category ID')
];

export const validateUserRightOnProduct = async (productId, userId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }
    await validateUserRight(product.userId.toString() , userId);
};
export const validateUserRight=async(id, userId)=>{
    if (id !== userId) {
        throw new Error('Forbidden: You do not have permission to update this product.');
    }
}

export const authorizeProductUpdate = async (productId, userLoggedIn) => {
    try {
        const productExist = await Product.findById(productId); // Check if the product exists
        if (!productExist) {
            throw new Error('Product not found'); // Handle case where the product does not exist
        }

        if (productExist.userId.toString() !== userLoggedIn) {
            throw new Error('Forbidden: You do not have permission to update this product.'); // Throw error if user is not authorized
        }

    } catch (error) {
        // Optionally log the error or handle it as needed
        throw error; // Re-throw the error to be handled by the calling function
    }
};
