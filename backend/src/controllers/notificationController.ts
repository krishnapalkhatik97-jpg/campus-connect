import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: any;
}import prisma from "../lib/prisma";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};