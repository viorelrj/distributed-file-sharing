import { Socket } from "socket.io";

type SocketHandlerFn = (socket: Socket, ...args: unknown[]) => void;

const registerHandler = (socket: Socket, event: string, handler: SocketHandlerFn) => {
  socket.on(event, (...args) => {
    handler(socket, ...args);
  });
};

export { registerHandler};
