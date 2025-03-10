
import io from 'socket.io-client';
let socket;
const initSocket = (userId) => {
  socket = io('http://127.0.0.1:4000', {
    query: { userid: userId }
  });

  socket.on("connect", () => {
    console.log(`连接成功,您连接的id是: ${socket.id}`);

  });
  socket.on("connect_error", (err) => {
    console.error('连接错误:', err);
  });

  socket.on("connect_timeout", () => {
    console.error('连接超时');
  });
  socket.on("disconnect", (reason) => {
    if (reason === 'io server disconnect') {
      console.log('服务器断开连接，尝试重新连接...');
      socket.connect();
    }
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
