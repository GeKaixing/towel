
import io from 'socket.io-client';
let socket;
const initSocket = (userId) => {
  socket = io('http://127.0.0.1:4000', {
    query: { userid: userId }
  });

  socket.on("connect", () => {
    console.log(`Socket connected with id: ${socket.id}`);
  });
  return socket;
};

const getSocket = () => {
  if (!socket) {
    throw new Error('Socket has not been initialized.');
  }
  return socket;
};

export { initSocket, getSocket };
