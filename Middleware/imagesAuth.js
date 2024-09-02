import { upload } from "../utils/multer.js"; // Make sure the path is correct

export const handleImages = (req, res, next) => {
  upload.array('image', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Maximum 5 images allowed." });
    }
    next();
  });
};