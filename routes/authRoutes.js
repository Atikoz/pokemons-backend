import express from 'express';
import validateRequest from '../middleware/validateRequest.js'
import loginSchema from '../validationSchemas/loginSchema.js';
import authController from '../controllers/authController.js';
const authRouter = express.Router();

authRouter.get('/nonce', authController.createNonceUser);
authRouter.post('/login', validateRequest(loginSchema), authController.loginUser);



export default authRouter