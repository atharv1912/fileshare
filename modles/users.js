


class User {
  constructor() {
    this.uid = require("uuid").v4();
    this.connectedAt = new Date();
  }
}

module.exports = User;
