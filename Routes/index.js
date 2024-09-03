
import express from "express";

import userRouter from "./user.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/', productRouter);
router.use('/auth', authRouter);

export default router;