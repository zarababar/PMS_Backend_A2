import express from "express";
import { createUser, userProducts } from "../Controller/user.js";
import { SignupValidation } from "../utils/validation.js";
import { isAuthenticated } from "../Middleware/auth.js";
const router = express.Router();

router.post('/create', SignupValidation, createUser);

router.get('/products', isAuthenticated, userProducts);

export default router;
