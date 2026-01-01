class Session {
  constructor(id) {
    this.id = id;                     // unique session id
    this.participants = new Set();    // connected users
    this.createdAt = new Date();      // session start time
    this.isActive = true;             // session status
    this.updatedAt =  new Date();
  }

  addpeer(id){
    if(this.participants.has(id)){
        throw new AppError("cannot add same peer", 403);
    }
    if (!this.isActive) {
      throw new AppError("Session is closed", 403);
    }
    if(this.participants.size >=2){
      throw new AppError("session is full", 403);

    }
    this.participants.add(id);
    this.touch()
   
  }
  remeovepeer(id){
    this.participants.delete(id);
    if(this.participants.size==0){

        this.end();
    }
  }
  end(){
    this.isActive= false;
  }
  isfull(){
    if(this.participants.size >=2){
        return false;
    }


  }
  touch(){
    this.updatedAt = new Date();
  }
  
}

export default Session;