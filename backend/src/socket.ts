import { Server } from "socket.io";

let io: Server;

export const initSocket = (socketIo: Server) => {
  io = socketIo;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};