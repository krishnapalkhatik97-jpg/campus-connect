import { Request, Response } from "express";
import prisma from "../lib/prisma";

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