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
  const [users, setUsers] = useState(['I think we\'re alone?']);
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
        console.log('Joined with ' + user);
      }
    });

    // return () => { // Cleanup function necessary?
    //   socket.emit('disconnect');
    //   socket.disconnect();
    //   setIsConnected(false);
    // }
  }, [location.search]);

  useEffect(() => { // INBOUND MESSAGE HANDLING
    const addNewChatMsg = newMsg => setMessages([...messages, newMsg]);
    socket.on('newChatMsg', (msg) => { addNewChatMsg(msg); socket.off(); })

    const updateRoomUserList = usersArr => {
      const namesArr = usersArr.map(user => user.name)
      const otherUsersNames = namesArr.filter(userName => userName !== name);
      if (otherUsersNames.length === 0) {
        setUsers(['You Are Alone']);
      } else {
        setUsers(otherUsersNames);
      }
    }
    socket.on('roomData', ({ room, users, time }) => {
      console.log(`A: Rec roomData Update (${room} version) at ${Date.now()}`);
      console.log(users);
      updateRoomUserList(users);
      socket.off();
    });


  });

  return (
    <main>
      <section className="chats-container">
        <Infobar room={room} isConnected={isConnected} />
        <RoomUsersDiv userNames={users} />
        <div className="chat-main-container">
          <MessagesContainer messages={messages} name={name} />
          <NewMessageInput />
        </div>
      </section>
    </main>
  )
}

export default Chat;