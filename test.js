// test-server.js
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);
  socket.emit('welcome', { message: 'Connected!' });
});

server.listen(3001, () => {
  console.log('✅ Test server running on port 3001');
});