import express from 'express';
import { updatePaymentsFromCSV, uploadCSVMiddleware } from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const router = express.Router();

router.post('/update-csv', adminAuth, uploadCSVMiddleware, updatePaymentsFromCSV);

export default router;
