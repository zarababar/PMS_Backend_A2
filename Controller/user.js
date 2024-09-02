import { createUserService, userProductsService } from "../Services/user.js";
import User from "../Model/User.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const result = await createUserService({ name, email, password });
        // res.cookie("token", result.token);
        res.status(201).json({
            data: result // result will already be in DTO format
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const userProducts = async (req, res) => {
    try {
        const result = await userProductsService(req.user.id);

        res.status(200).json({
            data: result // Return the updated product in DTO format
        });
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return an error response if any
    }
}