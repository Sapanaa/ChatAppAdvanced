import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';


dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend
  credentials: true               // If you plan to use cookies
}));
const prisma = new PrismaClient();

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes); // Conversation routes
app.use('/api/messages', messageRoutes); 






const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});