import { Server } from "socket.io";
import sessionManager from "../managers/sessionManager.instance.js";

const socketSessionMap = new Map();

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", ({ sessionId, userId }) => {
      const session = sessionManager.getSession(sessionId);

      if (!session || !session.participants.has(userId)) {
        socket.emit("error", "Invalid session");
        return socket.disconnect();
      }
      

      socket.join(sessionId);
      socketSessionMap.set(socket.id, { sessionId, userId });

      console.log(`Socket ${socket.id} joined room ${sessionId}`);

      socket.to(sessionId).emit("peer-joined", { userId });
    });

    socket.on("disconnect", () => {
      const meta = socketSessionMap.get(socket.id);
      if (!meta) return;

      const { sessionId, userId } = meta;
      const session = sessionManager.getSession(sessionId);

      if (session) {
        session.removepeer(userId);
        socket.to(sessionId).emit("peer-left", { userId });

        if (!session.isActive) {
          sessionManager.deleteSession(sessionId);
        }
      }

      socketSessionMap.delete(socket.id);
      console.log("Socket disconnected:", socket.id);
    });
  });
}
