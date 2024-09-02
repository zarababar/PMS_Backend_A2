import { generateToken } from '../Middleware/auth.js';
import User from '../Model/User.js';
import tokenBlacklist from '../utils/blacklist.js';
import jwt from 'jsonwebtoken';
export const loginService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found!');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
        throw new Error('Email or password is incorrect!');
    }
    const payload = { id: user._id.toString() };
    const token = generateToken(payload);

    // Return user and token to the controller
    return { user, token };
};


export const logoutService = (authorization) => {
    const token = authorization.split(' ')[1];
    if (!token) {
        throw new Error('No token provided.');
    }

    // Add token to blacklist
    tokenBlacklist.add(token);
    };


