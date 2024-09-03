import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';

import routes from './Routes/index.js';

const app = express();

dotenv.config(); //Loads .env file contents into process.env by default
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //json parsing middleware

app.use('/', routes);

mongoose.connect(MONGODB_URL)
    .then(result => {
        console.log("Database connection successful.");
        app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
    })
    .catch(err => { console.log('Database connection error:', err) });


