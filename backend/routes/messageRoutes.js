import express from 'express'
import { sendMessage, getMessages, markMessageAsRead} from '../controllers/messageController.js'
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/send', sendMessage);  
router.get('/:conversationId', getMessages);
router.post('/read', markMessageAsRead);

export default router