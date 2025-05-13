import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Send a new message in a conversation
export const sendMessage = async (req, res) => {
   const { content, senderId, conversationId } = req.body;

  if (!content || !senderId || !conversationId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        sender: {
          connect: { id: senderId }
        },
        conversation: {
          connect: { id: conversationId }
        }
      },
      include: {
        sender: true,
        conversation: true
      }
    });

    res.status(201).json({ message: 'Message sent', newMessage });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get messages of a conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark a message as read
export const markMessageAsRead = async (req, res) => {
  const { messageId, userId } = req.body;

  try {
    // Create the read receipt
    await prisma.messageRead.create({
      data: {
        messageId,
        userId,
      },
    });

    res.status(200).json({ message: 'Message marked as read' });
  } catch (err) {
    console.error('Error marking message as read:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
