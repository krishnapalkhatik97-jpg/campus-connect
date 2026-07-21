import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const searchUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const q = (req.query.q as string)?.trim();

    if (!q) {
      return res.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
      },
      take: 10,
    });

    return res.json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};