import ProductDTO from "../Mapper/product.js";
import Product from "../Model/product.js";
import mongoose from "mongoose";

import { addProductToCategory, deleteCategoryService, updateCategoryService } from "./category.js";
import Category from "../Model/category.js";
import { addProductToUser, removeProductFromUser } from "./user.js";

export const createProductService = async (product) => {
    const { name, description, price, imageUrl, category, userId } = product;

    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: category,
        userId: userId
    });
    const savedProduct = await newProduct.save(); //saved in db
    await addProductToCategory(savedProduct);
    await addProductToUser(userId, savedProduct);

    // set DTO to return only selected fields from it.
    const productDTO = new ProductDTO({
        name: savedProduct.name,
        category: savedProduct.category,
        userId: savedProduct.userId
    });
    return {
        name: productDTO.name,
        category: productDTO.category,
        userId: savedProduct.userId
    }
}

export const updateProductService = async (id, productData, userId) => {

    // Use Product model to update, not User
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
        throw new Error("Product not found");
    }

    updateCategoryService(existingProduct, productData);

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    return updatedProduct; // Return the updated product
}

export const deleteProductService = async (productId) => {
    const existingProduct = await Product.findById(productId);
    await deleteCategoryService(existingProduct, productId);
    await removeProductFromUser(existingProduct.userId, productId);
    return await Product.findByIdAndDelete(productId);
}

export const getUserProductsService = async (userId) => {
    //User is a ref of type object so converted
    const objectId = new mongoose.Types.ObjectId(userId);
    const products = await Product.find({ userId: objectId });

    //Set DTO to return only selected fields from it.
    // Map DTOs for each product since array of products
    const productDTOs = products.map(product => new ProductDTO({
        name: product.name,
        category: product.category,
        userId: product.userId
    }));

    return productDTOs;
}

export const getCategoryProductsService = async (categoryId) => {
    const categoryData = await Category.findById(categoryId)
        .populate({
            path: 'products', // Populate the 'products' field
        })
        .select('name'); // Also select the 'name' field of the category

    const productsDTO = categoryData.products.map((product) => ({
        name: product.name,
        price: product.price,
        description: product.description
    }));

    // Create response with category name and product details
    return {
        categoryName: categoryData.name,
        products: productsDTO
    };
}

export const getProductsDetailsService = async (productId) => {
    const product = await Product.findById(productId)
        .populate({ path: 'userId', select: 'name email' })
        .populate({ path: 'category', select: 'name' })

    return product;
}

export const getAllProductsService = async () => {
    const products = await Product.find()
    return products;
}