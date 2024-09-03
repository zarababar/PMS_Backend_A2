// import { upload } from "../utils/multer.js"; // Make sure the path is correct

// export const handleImages = (req, res, next) => {
//   upload.array('image', 5)(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: "Maximum 5 images allowed." });
//     }
//     next();
//   });
// };
import { upload } from "../utils/multer.js"; // Make sure the path is correct
import multer from "multer";
export const handleImages = (req, res, next) => {
  upload.array('image', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Custom error (from fileFilter)
      return res.status(400).json({ message: err.message });
    }
    
    // If no error, proceed to the next middleware
    next();
  });
};
