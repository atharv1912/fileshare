import express from 'express';
import { randomUUID } from "crypto";
import sessionRoutes from "./routes/session.routes.js";
import http from 'http';
import { Server } from 'socket.io';
import setupSocket from './sockets/index.js';

const app = express();
const server = http.createServer(app)
setupSocket(server);

const PORT = 3000;
const sessions = new Map();


app.use(express.json());
app.use(express.static('public'));
app.use('/api', sessionRoutes);



// Change from app.listen to server.listen
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});