import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getIO } from "../socket";
import { createNotification } from "../services/notificationService";

// =======================
// Send Message
// =======================
export const sendMessage = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const senderId = req.user!.id;
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({
        message: "Conversation ID and content are required",
      });
    }

    // Save Message
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

    // Update conversation timestamp
    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    // Find receiver
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
        // Save Notification
        await createNotification(
          receiver.id,
          senderId,
          "MESSAGE",
          undefined,
          "sent you a message"
        );

        const io = getIO();

        // Real-time chat
        io.to(receiver.id).emit("newMessage", message);

        // Real-time notification
        io.to(receiver.id).emit("newNotification", {
          sender: message.sender,
          message: "sent you a message",
          type: "MESSAGE",
          createdAt: new Date(),
        });

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

// =======================
// Get Messages
// =======================
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