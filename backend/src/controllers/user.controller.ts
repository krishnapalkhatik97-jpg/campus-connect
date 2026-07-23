import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getMe = async (req: Request, res: Response) => {
  try {
    // protect middleware should have attached user id here
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};