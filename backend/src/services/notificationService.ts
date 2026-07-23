import prisma from "../lib/prisma";

export const createNotification = async (
  receiverId: string,
  senderId: string | null,
  type: string,
  postId?: string,
  message?: string
) => {
  return await prisma.notification.create({
    data: {
      receiverId,
      senderId,
      type,
      postId,
      message,
    },
  });
};