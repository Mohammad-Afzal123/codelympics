import express from 'express';
import { getPaidSections } from '../controllers/sectionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getPaidSections);

export default router;
