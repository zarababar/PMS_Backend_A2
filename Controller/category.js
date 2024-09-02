
import { createCategoryService } from "../Services/category.js";
export const createCategory=async(req, res, next)=>{
try {
    const result = await createCategoryService();
    res.status(201).json({
        data: result // result will already be in DTO format
    });

} catch (error) {
    res.status(400).json({ message: error.message });
}
}