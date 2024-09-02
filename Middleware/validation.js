import { validationResult } from "express-validator";

export const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ message: errors.array()[0].msg });
    }
    next();
}
