import { Server, Socket } from "socket.io";
import logger from "../middlewares/winston";

class SocketService {
  private io: Server | null = null;
  private userSockets: Map<string, string> = new Map(); // Map to store userId -> socketId

  initialize(io: Server) {
    this.io = io;
    logger.info("Socket.io initialized");

    io.on("connection", (socket: Socket) => {
      logger.info(`A user connected with socket ID: ${socket.id}`);

      socket.on("registerUser", (userId: string) => {
        this.userSockets.set(userId, socket.id); // Store the userId with associated socketId
        logger.info(`User ${userId} registered with socket ID: ${socket.id}`);
      });

      socket.on("disconnect", () => {
        const userId = Array.from(this.userSockets.entries()).find(
          ([, id]) => id === socket.id,
        )?.[0];

        if (userId) {
          this.userSockets.delete(userId); // Remove user on disconnect
          logger.info(`User ${userId} disconnected`);
        }
      });
    });
  }

  getSocketByUserId(userId: string) {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }

    const socketId = this.userSockets.get(userId);
    return socketId ? this.io.sockets.sockets.get(socketId) : null;
  }
}

export default new SocketService();
