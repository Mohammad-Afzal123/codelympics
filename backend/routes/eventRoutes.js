import express from 'express';
import { 
  getEventsBySection, 
  getEventById, 
  registerForEvent, 
  getMyRegistrations 
} from '../controllers/eventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getEventsBySection);
router.get('/my', authMiddleware, getMyRegistrations);  // must be before :id
router.get('/:id', authMiddleware, getEventById);
router.post('/register', authMiddleware, registerForEvent);

export default router;
