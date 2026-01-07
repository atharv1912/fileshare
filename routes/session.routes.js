import express from  'express';
import { randomUUID } from 'crypto';
import sessionManager from '../managers/sessionManager.instance.js';



const router = express.Router();


router.post("/create-session", async (req, res) => {
  try {

    const userId = randomUUID();
    const sessionId = randomUUID();
    const session = sessionManager.createSession(sessionId);
    session.addpeer(userId);
    console.log(session.participants);


    return res.status(201).json({
      success: true,
      message: "Created successfully",
      session,
      userId
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
router.post("/join-session/:sessionId", async (req, res) => {
  try {

    const {sessionId }= req.params; 
    const userId = randomUUID();
    const session = sessionManager.joinSession(sessionId, userId);
    console.log(session.participants);


    

    // save logic

    return res.status(201).json({
      success: true,
      message: "session joined successfully",
      sessionId,
      session,
      userId
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


export default router;