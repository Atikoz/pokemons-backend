import express from 'express';
import verifyToken from '../middleware/sessionMiddleware.js';
import userController from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/getHistoryBattle', verifyToken, userController.getHistoryBattles);

export default userRouter
