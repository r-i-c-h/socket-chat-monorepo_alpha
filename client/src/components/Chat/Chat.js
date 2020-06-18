import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { socket } from '../../utils/SocketConnection';
import './Chat.css';

import RoomUsersDiv from '../RoomUsersDiv/RoomUsersDiv';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import Infobar from '../Infobar/Infobar';
import NewMessageInput from '../NewMessageInput/NewMessageInput';

const Chat = ({ location }) => { // location is from react-router-dom
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => { // init()
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    // Defined args are data passed to server
    // the defined callback func() is executed by the server
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert('ERROR: ' + error);
        setRoom('ERROR');
        setIsConnected(false);
      } else {
        console.log('Setting Connected');
        setIsConnected(true);
      }
      console.log('End JOIN Emit');
    });

    return () => socket.disconnect();

    // return () => { // Cleanup function necessary?
    //   socket.emit('disconnect');
    //   setIsConnected(false);
    // }
  }, [location.search]);

  useEffect(() => { // INBOUND MESSAGE HANDLING
    const addNewChatMsg = newMsg => setMessages(messages => [...messages, newMsg]);
    socket.on('newChatMsg', (msg) => {
      console.log('NEW CHAT: ', msg.text);
      addNewChatMsg(msg);
    })

    socket.on('roomData', ({ room, users, time }) => {
      console.log(`NEW ROOM DATA: (${room} ver) at ${Date.now()}`);
      console.log('setUsers: ', users);
      setUsers(users);
    });
  }, []);

  return (
    <main>
      <section className="chats-container">
        <Infobar room={room} isConnected={isConnected} />
        <RoomUsersDiv users={users} name={name} />
        <div className="chat-main-container">
          <MessagesContainer messages={messages} name={name} />
          <NewMessageInput />
        </div>
      </section>
    </main>
  )
}

export default Chat;