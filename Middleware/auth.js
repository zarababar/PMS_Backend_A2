import jwt from 'jsonwebtoken';
import tokenBlacklist from '../utils/blacklist.js';
// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const isAuthenticated = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: 'Invalid Token.' });
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        // Check if token is in blacklist
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ message: 'Token has been invalidated. Kindly, Login to continue..' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
};

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: 300000 });
}
