import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const toggleFollow = async (req: Request, res: Response) => {
  try {
    const followerId = req.user.id; // Logged-in user
    const { userId: followingId } = req.params;

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return res.json({
        message: "Unfollowed successfully",
        following: false,
      });
    }

    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return res.json({
      message: "Followed successfully",
      following: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};