import { Request, Response } from "express";
import prisma from "../lib/prisma";

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

    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

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