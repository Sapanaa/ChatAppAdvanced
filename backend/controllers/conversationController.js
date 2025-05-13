import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new conversation
export const createConversation = async (req, res) => {
  const { userIds, initialMessage } = req.body;

  try {
    // Validate userIds to make sure at least two users are passed
    if (!userIds || userIds.length < 2) {
      return res.status(400).json({ error: "At least two users are required to create a conversation." });
    }

    // Create the conversation and add members to it in a single operation
    const conversation = await prisma.conversation.create({
      data: {
        // Creating the conversation members
        members: {
          create: userIds.map(userId => ({
            userId,
          }))
        },
        // If an initial message is provided, create the first message
        messages: initialMessage
          ? {
              create: [
                {
                  content: initialMessage,
                  senderId: userIds[0], // Assuming the first user sends the first message
                }
              ]
            }
          : {}
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              }
            }
          }
        },
        messages: true,  // Include messages in the response
      }
    });

    res.status(200).json({
      message: 'Conversation created successfully!',
      conversation,
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Error creating conversation' });
  }
}
// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: true,
        messages: true,
      },
    });

    res.status(200).json(conversations);
  } catch (err) {
    console.error('Error fetching user conversations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a user to an existing conversation
export const addUserToConversation = async (req, res) => {
  const { conversationId, userId } = req.body;

  try {
    // Check if the conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { members: true }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found.' });
    }

    // Check if the user already exists as a member of the conversation
    const userAlreadyInConversation = conversation.members.some(member => member.userId === userId);

    if (userAlreadyInConversation) {
      return res.status(400).json({ error: 'User is already a member of this conversation.' });
    }

    // Add the user to the conversation by creating a new ConversationMember
    const newMember = await prisma.conversationMember.create({
      data: {
        userId: userId,
        conversationId: conversationId,
      },
    });

    res.status(200).json({
      message: 'User added to the conversation successfully!',
      newMember,
    });
  } catch (error) {
    console.error('Error adding user to conversation:', error);
    res.status(500).json({ error: 'Error adding user to conversation' });
  }
}

export const getConversationMembers = async (req, res) => {
    const { conversationId } = req.params;

  try {
    // Validate if conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
              }
            }
          }
        }
      }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found.' });
    }

    const members = conversation.members.map(member => member.user);

    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching conversation members:', error);
    res.status(500).json({ error: 'Failed to fetch conversation members.' });
  }
}