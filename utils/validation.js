import { check, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

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

    // check('image')
    //     // .isArray().withMessage('Format must be valid')
    //     .notEmpty().withMessage('Images are required')

];

// Validation rule for checking ObjectId parameters
export const idValidation = [
    param('id')
        .isMongoId().withMessage('Invalid product ID')
];

export const userIdValidation = [
    param('userId')
        .isMongoId().withMessage('Invalid user ID')
];

export const categoryIdValidation = [
    param('category')
        .isMongoId().withMessage('Invalid category ID')
];
