import express from 'express';
import authRoutes from './authRoutes.js';
import dataRoutes from './dataRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/data', dataRoutes);
router.use('/user', userRoutes);

export default router;
