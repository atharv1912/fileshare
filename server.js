import express from 'express';
import Session from './modles/session.js';
import { randomUUID } from "crypto";

const app = express();
const PORT = 3000;
const sessions = new Map();

app.get("/", async (req, res) => {
  try {
    // logic here
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
app.post("/create-session", async (req, res) => {
  try {
    const sessionId = randomUUID(); // unique session id
    const userId = randomUUID();

    if (sessions.has(sessionId)) {
      throw new AppError("Session already exists", 409);
    }

    const session = new Session(sessionId);
    session.addpeer(userId);

    sessions.set(sessionId, session);

    return res.status(201).json({
      success: true,
      message: "Session created",
      sessionId,
      session
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});