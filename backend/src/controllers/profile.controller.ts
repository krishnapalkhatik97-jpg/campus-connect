import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user.id;
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFollowing = user.followers.some(
      (follow) => follow.followerId === loggedInUserId
    );

    res.json({
      id: user.id,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      followers: user.followers.length,
      following: user.following.length,
      posts: user.posts,
      isFollowing,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};