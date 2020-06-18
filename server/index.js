const express = require('express');
const http = require('http')
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/userUtils.js');
const { formatChatMsg, formatRoomData } = require('./utils/messageUtils');

const router = require('./utils/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(router);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//*** IO ACTIONS ***//
io.on('connection', (socket) => {
  console.log(`NEW CONNECTION TO SERVER: ${socket.id} at ${Date.now()}`);

  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      console.error('Something went wrong: ', error);
      return cb(error);
    }
    socket.join(user.roomID);

    socket.emit('newChatMsg', formatChatMsg('System', `${user.name} welcome to ${user.room}`));
    socket.broadcast.to(user.roomID).emit('newChatMsg', formatChatMsg('System', `${user.name} has joined ${user.room}`));
    io.to(user.roomID).emit('roomData', { room: user.room, users: getUsersInRoom(user.roomID) });

    console.log(`Added ${socket.id} as ${name} to room ${user.roomID}`);
    if (cb) { cb(); }
  });

  socket.on('reqRoomUpdate', () => {
    const user = getUser(socket.id);
    if (user) {
      const roomData = formatRoomData(user.room, getUsersInRoom(user.roomID))
      io.to(user.roomID).emit('roomData', roomData);
    }
  });

  socket.on('newChatMsg', (msg, cb) => { // relay chat msgs (w/server timestamp)
    const user = getUser(socket.id);
    if (user) {
      const newChatMsg = formatChatMsg(user.name, msg.text);
      io.to(user.roomID).emit('newChatMsg', newChatMsg);
    }

    if (cb) { cb(); }
  });

  socket.on('disconnect', () => {
    const removedUser = removeUser(socket.id);
    console.log(`${socket.id} DISCONNECTED FROM SERVER`);
    console.log('removedUser:', removedUser);

    io.to(removedUser.roomID).emit('newChatMsg', formatChatMsg('System', `${removedUser.name} has left ${removedUser.room}`));
    io.to(removedUser.roomID).emit('roomData', formatRoomData('User left', getUsersInRoom(removedUser.roomID)));
    console.log(socket.rooms);
    socket.leave(removedUser.roomID);

  });
})

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`~~~~~~~~~~~~~~~~\n Server up and listening at port:${PORT}`));