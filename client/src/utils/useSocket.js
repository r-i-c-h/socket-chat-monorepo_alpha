// Stolen from https://github.com/iamgyz/use-socket.io-client
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// const PORT = 5000;
// const SERVER = `localhost`
// const SOCKETPORT = `${SERVER}:${PORT}`;
const ENDPOINT = process.env.SOCKETPORT || "http://localhost:5000";

export const useSocket = (...args) => {
  const [socket] = useState(() => io(...args));
  useEffect(() => {
    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, []);
  return [socket]
};

/*
You can easily write this inside the body of a function component:
You can treat "useSocket" as "io"

import useSocket

// (If ya want): const options = { autoConnect: false }
const [socket] = useSocket('ws://localhost:8080',options);
socket.connect();

socket.on('message',(text)=>{
  console.log(text);
});

socket.emit('message','this is demo..');


*/