import multer from 'multer';// File filter function
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jfif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype) || file.originalname.toLowerCase().endsWith('.jfif')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPEG, PNG, AVIF, WebP, and JFIF files are allowed!'), false); // Reject the file
    }
};

// Set storage engine
const storage = multer.diskStorage({
    // Specify destination folder for uploads
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Destination folder for uploads
    },
    // Set filename format
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to the filename
    }
});

// Initialize upload middleware with fileFilter
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Add fileFilter to multer configuration
});
