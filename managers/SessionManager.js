import Session from "../modles/session.js";
import AppError from "./AppError.js";

class SessionManager {
    constructor(){
        this.sessions = new Map();
    }

    createSession(sessionId){
        if(this.sessions.has(sessionId)){
            throw new AppError("Session already exists", 409);

        }
        const session = new Session(sessionId);
        this.sessions.set(sessionId,session);
        return session;
    }
    getSession(sessionId){
        const session = this.sessions.get(sessionId);
        if(!session){
            throw new AppError("Session not found", 404);
        }
        return session;
    }
    joinSession(sessionId,peerId){
        const session = this.getSession(sessionId);
        session.addpeer(peerId);
        return session;
    }
    listSessions() {
    return Array.from(this.sessions.values());
    
  }
  deleteSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      throw new AppError("Session not found", 404);
    }

    this.sessions.delete(sessionId);
  }
}


export default SessionManager;