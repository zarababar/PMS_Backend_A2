import multer from 'multer';

// Set storage engine
const storage = multer.diskStorage({
    //file user trying to upload
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        // by date name
        cb(null,` ${Date.now()}-${file.originalname}`);
    }
});

// Initialize upload middleware
export const upload = multer({ storage: storage });
