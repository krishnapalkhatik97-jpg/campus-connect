import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getIO } from "../socket";

// Send Message
export const sendMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const senderId = (req as any).user.id;
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({
        message: "Conversation ID and content are required",
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    // Get conversation participants
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: true,
      },
    });

    if (conversation) {
      const receiver = conversation.participants.find(
        (participant) => participant.id !== senderId
      );

      if (receiver) {
        const io = getIO();

        io.to(receiver.id).emit("newMessage", message);

        console.log(
          `📨 Message sent from ${senderId} to ${receiver.id}`
        );
      }
    }

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Messages
export const getMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const conversationId = req.params.conversationId as string;
    if (!conversationId) {
  return res.status(400).json({
    message: "Conversation ID is required",
  });
}
           

     
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};