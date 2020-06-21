import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

import RoomUsersDiv from '../RoomUsersDiv/RoomUsersDiv';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import Infobar from '../Infobar/Infobar';
import NewMessageInput from '../NewMessageInput/NewMessageInput';

import './Chat.css';

const ENDPOINT = process.env.BACKEND || "http://localhost:5000";

const Chat = ({ location, history }) => { // location is from react-router-dom
  const [socket, setSocket] = useState(null); // store the socket here
  const [socketID, setSocketID] = useState(null); // not really using it but would be better for name comparisons
  const [isConnected, setIsConnected] = useState(false); // for status dot
  const [isLoading, setIsLoading] = useState(true); // to slack on the screen display
  const [name, setName] = useState(''); // registration info
  const [room, setRoom] = useState(''); // registration info
  const [messages, setMessages] = useState([]); // !   <~~ Chat Messages Store
  const [users, setUsers] = useState([]); // ! <~~ Arr of User{}s in our room

  const addNewChatMsg = newMsg => setMessages(messages => [...messages, newMsg]);

  // Establish Connection
  useEffect(() => { // init()
    setSocket(io(ENDPOINT));
  }, []);

  // Read URL Parameters
  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);
    setName(queryString.parse(location.search).name);
    setRoom(queryString.parse(location.search).room);
  }, [location]);

  // Socket Events:
  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketID(socket.id);
      setIsConnected(socket.connected);
      console.log(`~~~Connected with ID ${socket.id}. status:${socket.connected}`);

      // Defined args are data passed to server
      // the defined callback func() is executed by the server
      socket.emit('join', { name, room }, (error) => {
        if (error) {
          alert('ERROR: ' + error);
          // setRoom(null);
          // setIsConnected(false);
          history.push('/');
        } else {
          console.log('Joined Server');
          setIsConnected(true);
          setIsLoading(false);
        }
      });
    });

    socket.on('newChatMsg', (msg) => { addNewChatMsg(msg); });

    socket.on('roomData', ({ room, users, time }) => {
      console.log(`NEW ROOM DATA: (${room}) at ${Date.now()}`);
      console.log('setUsers: ', users);
      setUsers(users);
    });

    socket.on('disconnect', () => {
      setIsConnected(socket.connected); // which _should_ be false...
      console.log('~~~Disconnected!~~~');
    });

    return () => { // CLEANUP Function
      setIsConnected(false);
      socket && socket.emit('disconnect');
      socket && socket.removeAllListeners();
      socket && socket.close(); // .disconnect() is the literally the same thing as .close()
    }
  }, [socket]); // eslint-disable-line
  // Disable eslint above to stop warnings about room|name dependencies

  return (
    isLoading ? <div><h1>Loading...</h1></div>
      : (<main>
        <section className="chats-container">
          <Infobar room={room} isConnected={isConnected} />
          <RoomUsersDiv users={users} socketID={socketID} name={name} />
          <div className="chat-main-container">
            <MessagesContainer messages={messages} name={name} />
            <NewMessageInput socket={socket} />
          </div>
        </section>
      </main>)
  )
}

export default Chat;