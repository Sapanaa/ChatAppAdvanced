import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
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

const prisma = new PrismaClient();

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes); // Conversation routes
app.use('/api/messages', messageRoutes); 




io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for messages
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);

    // Broadcast to the room (conversation)
    io.to(data.conversationId).emit('newMessage', data);
  });

  // Join a conversation room
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
  });

  // Leave a conversation room
  socket.on('leaveRoom', (conversationId) => {
    socket.leave(conversationId);
    console.log(`User left room: ${conversationId}`);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});