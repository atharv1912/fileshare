import express from "express"
import cors from "cors";
import SessionManager from "./sessionManager/sessionManager.js";
import crypto from "crypto";
const PORT = 3000;

const app = express();
const sessionManager = new SessionManager();

// middleware
app.use(cors());
app.use(express.json());

app.post('/createSession', (req , res)=>{
  const userId = crypto.randomBytes(8).toString('hex');


  try {
    const session = sessionManager.createSession(userId);
    console.log(session);
    
    res.status(201).json({
      success: true,
      session,
      status: 'pending',
      message: 'Session created. Share this ID with peer.'
    });

  }
  catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});


app.post('/api/session/:sessionId/join', (req, res) => {
  const { sessionId } = req.params;
  
  // Validate session exists
  const session = sessionManager.getSession(sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  // Validate session is pending
  if (session.status !== 'pending') {
    return res.status(400).json({ 
      error: `Cannot join session. Current status: ${session.status}` 
    });
  }
  
  // Validate session has space (max 2 peers)
  // You need to implement this check
  
  const userId = crypto.randomBytes(8).toString('hex');
  // Join the session
  const updatedSession = sessionManager.joinSession(sessionId,userId);
  console.log(session);
  res.json({
    success: true,
    sessionStatus: updatedSession.status,
    message: 'Successfully joined session'
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


