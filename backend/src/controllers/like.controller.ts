import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createNotification } from "../services/notificationService";

export const toggleLike = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const postId = req.params.id as string;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // Unlike
    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      const likesCount = await prisma.like.count({
        where: {
          postId,
        },
      });

      return res.status(200).json({
        liked: false,
        likesCount,
      });
    }

    // Find post owner
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Like the post
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    // Create notification (don't notify yourself)
    if (post.authorId !== userId) {
      await createNotification(
        post.authorId,
        userId,
        "LIKE",
        postId,
        "liked your post"
      );
    }

    const likesCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    return res.status(200).json({
      liked: true,
      likesCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};