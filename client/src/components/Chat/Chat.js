import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { socket } from '../../utils/SocketConnection';
import './Chat.css';

import Infobar from '../Infobar/Infobar';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import NewMessageInput from '../NewMessageInput/NewMessageInput';
import RoomUsersDiv from '../RoomUsersDiv/RoomUsersDiv';

const Chat = ({ location }) => { // location is from react-router-dom
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomUsernames, setRoomUsernames] = useState(['We Are Alone?']);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => { // init()
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    // Defined args are data passed to server
    // the defined callback func() is executed by the server
    socket.emit('join', { name, room }, ({ error, user }) => {
      if (error) {
        alert('ERROR: ' + error);
        setRoom('ERROR');
      } else {
        if (user) { setIsConnected(true); }
      }
    });

    return () => { // Cleanup function
      socket.emit('disconnect');
      socket.disconnect();
      setIsConnected(false);
    }
  }, [location.search]);

  useEffect(() => { // INBOUND MESSAGE HANDLING
    // const addNewChatMsg = newMsg => setMessages([...messages, newMsg]);
    // socket.on('newChatMsg', (msg) => { addNewChatMsg(msg); socket.off(); }) // Needed socket.off for embedded sockIO. Still necessary??
    socket.on('newChatMsg', (msg) => { setMessages([...messages, msg]); })

    const updateRoomUsers = usersArr => {
      const namesArr = usersArr.map(user => user.name)
      const otherUsersNames = namesArr.filter(userName => userName !== name);
      if (otherUsersNames.length === 0) {
        setRoomUsernames(['You Are Alone']);
      } else {
        setRoomUsernames(otherUsersNames);
      }
    }
    socket.on('roomData', ({ room, users, time }) => {
      console.log(`A: Rec roomData Update (${room} version) at ${Date.now()}`);
      console.log(users);
      updateRoomUsers(users);
    });
  });

  return (
    <main>
      <section className="chat-container">
        <Infobar room={room} isConnected={isConnected} />
        <MessagesContainer messages={messages} name={name} />
        <NewMessageInput />
        <RoomUsersDiv userNames={roomUsernames} />
      </section>
    </main>
  )
}

export default Chat;