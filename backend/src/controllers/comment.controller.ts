import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createNotification } from "../services/notificationService";

export const createComment = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const { content } = req.body;
    const { id: postId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "Comment is required",
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

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Create notification (don't notify yourself)
    if (post.authorId !== req.user.id) {
      await createNotification(
        post.authorId,
        req.user.id,
        "COMMENT",
        postId,
        "commented on your post"
      );
    }

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getComments = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};