import io from 'socket.io-client';

const PORT = 5000;
const SERVER = `localhost`
const SOCKETPORT = `${SERVER}:${PORT}`;

const socket = io(SOCKETPORT);

export { socket };