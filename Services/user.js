import User from "../Model/User.js";
import userDTO from "../Mapper/user.js";
import { generateToken } from "../Middleware/auth.js";

export const createUserService = async (user) => {
    const { name, email, password, products = [] } = user;

    const newUser = new User({
        name: name,
        email: email,
        password: password,
        products: products
    });

    const savedUser = await newUser.save(); //saved in db
    const payload = { id: user._id };
    const token = generateToken(payload);
    return {
        user: new userDTO({ name: savedUser.name, email: savedUser.email }),
        token: token

    }  // Encapsulating user data using DTO
};

export const userProductsService = async (userId) => {
    const user = await User.findById(userId).populate('products');
    return user;
}

export const addProductToUser = async (userId, product) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Push only the product ID (ObjectId) into the products array
        user.products.push(product._id.toString());

        // Save the updated user document
        await user.save();
    } catch (error) {
        console.error("Error adding product to user:", error);
        throw error;
    }
};

export const removeProductFromUser = async (userId, productId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Remove the product ID from the user's products array
        user.products.pull(productId);

        // Save the updated user document
        await user.save();
    } catch (error) {
        console.error("Error removing product from user:", error);
        throw error; // Optional: rethrow the error to handle it further up the call stack
    }
};



