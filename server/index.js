const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;
const router = require('./router');

app.use(router);

io.on('connection', (socket) => {
  console.log('NEW CONNECTION TO SERVER');

  socket.on('disconnect', () => {
    console.log('USER DISCONNECT FROM SERVER');
  })

})



server.listen(PORT, () => console.log(`Server up and listening at port:${PORT}`));