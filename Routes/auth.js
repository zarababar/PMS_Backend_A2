import express from 'express';
import { login, logout } from '../Controller/auth.js';
import { LoginValidation } from '../utils/validation.js';
import { validation } from '../Middleware/validation.js';

const route = express.Router();
route.post('/login', LoginValidation, validation, login);
route.post('/logout', logout);
export default route;
