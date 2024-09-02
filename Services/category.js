import Category from "../Model/category.js";
export const createCategoryService = async () => {

    const categories = [
        { name: 'Mobile', products: [] },
        { name: 'Laptops', products: [] },
        { name: 'Earphone', products: [] },
        { name: 'Tablet', products: [] } // Fourth category, replace with any other if desired
    ];

    // Insert the categories into the database
    return Category.insertMany(categories);
}

export const addProductToCategory = async (product) => {

    const addCategoryProduct = await Category.findById(product.category.toString()); // Await and find the category

    if (addCategoryProduct) { // Ensure the category exists
        // Push only the product ID (ObjectId) into the products array
        addCategoryProduct.products.push(product._id.toString());

        // Save the updated category document
        const savedProductInCategory = await addCategoryProduct.save();

    } else {
        console.log("Category not found.");
    }
};

export const updateCategoryService = async (existingProduct, updatedProductData) => {
    //tostring use because the category is of object type
    const currentCategoryId = existingProduct.category.toString(); // Get current category ID
    const newCategoryId = updatedProductData.category; // New category ID from request

    // Check if the category has changed
    if (currentCategoryId !== newCategoryId) {
        // Remove product from the old category
        await Category.findByIdAndUpdate(currentCategoryId, {
            $pull: { products: existingProduct._id } // Remove product ID from the old category
        });

        // Add product to the new category
        await Category.findByIdAndUpdate(newCategoryId, {
            $push: { products: existingProduct._id } // Add product ID to the new category
        });
    }

}

export const deleteCategoryService = async (existingProduct, productId) => {
    console.log(productId);
    
    const currentCategoryId = existingProduct.category.toString();

// Remove the product ID from the associated category's products array
    await Category.findByIdAndUpdate(currentCategoryId, {
        $pull: { products: productId }
    });
}
