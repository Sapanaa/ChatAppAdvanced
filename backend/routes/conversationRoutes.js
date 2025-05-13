import express from 'express';
import { createConversation, getUserConversations, addUserToConversation, getConversationMembers } from '../controllers/conversationController.js';

const router = express.Router();

router.post('/create', createConversation);
router.get('/:userId', getUserConversations);
router.post('/addUser', addUserToConversation);
router.get('/:conversationId/members',getConversationMembers );

export default router;