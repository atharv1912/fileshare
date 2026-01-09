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


    socket.on("file-meta",(meta)=>{
      const mapping = socketSessionMap.get(socket.id);
      if(!mapping) return ;

      const {sessionId}= mapping;

      socket.to(sessionId).emit("file-meta", meta);
    })

    socket.on("file-chunk", (index,chunk)=>{
      const mapping = socketSessionMap.get(socket.id);
      const {sessionId} = mapping;

      socket.to(sessionId).emit("file-chunk",index,chunk);
    });

    socket.on("chunk-ack", ({ index }) => {
      const { sessionId } = socketSessionMap.get(socket.id) || {};
      if (!sessionId) return;

      socket.to(sessionId).emit("chunk-ack", { index });
    });

    socket.on("file-end", () => {
        const mapping = socketSessionMap.get(socket.id);
        if (!mapping) return;

        const { sessionId } = mapping;

        socket.to(sessionId).emit("file-end");
      });

    socket.on("file-received",()=>{
      const mapping = socketSessionMap.get(socket.id);
      if(!mapping) return ;
      const {sessionId }= mapping;
      socket.to(sessionId).emit("file-received");

    })

  });

    
}
