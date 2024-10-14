import { Socket } from "socket.io";

export type SocketHandlerFn = (socket: Socket, ...args: unknown[]) => void;
export type HandlerMounter = (socket: Socket) => void;

const createHandler =
  (event: string, handler: SocketHandlerFn) => (socket: Socket) => {
    socket.on(event, (...args) => {
      handler(socket, ...args);
    });
  };

export { createHandler };
