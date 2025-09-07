import express from 'express';
import { registerForEvent } from '../controllers/registrationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registerForEvent);

export default router;
