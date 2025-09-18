import { Server } from "socket.io";
import { handleEvents } from "./handleEvents.js";

export const socketInitialize = (server) => {
  const io = new Server(server, {
    cors: { origin: ["*"], methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => handleEvents(socket, io));
};
