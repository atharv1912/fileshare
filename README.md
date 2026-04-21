# File Sharing App

This is a simple file sharing application built with Node.js, Express, and Socket.IO. It allows users to share files with each other in real-time.

## Features

- Real-time file sharing
- Session-based sharing
- Simple and easy-to-use interface

## Tech Stack

- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.IO
- **Frontend:** HTML, CSS, JavaScript
https://github.com/atharv1912/fileshare
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/filesharing.git
   ```
2. Navigate to the project directory:
   ```bash
   cd filesharing
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`.

## Project Structure

```
.
├── public/
│   └── index.html
├── routes/
│   └── session.routes.js
├── sockets/
│   └── index.js
├── managers/
│   ├── AppError.js
│   ├── sessionManager.instance.js
│   └── SessionManager.js
├── models/
│   └── session.js
├── package.json
└── server.js
```

## API Endpoints

- `POST /api/session`: Create a new session.

## Real-time Events

- `connection`: Triggered when a user connects to the server.
- `disconnect`: Triggered when a user disconnects from the server.
- `file-transfer`: Triggered when a file is being transferred.

## License

This project is licensed under the ISC License.
"
