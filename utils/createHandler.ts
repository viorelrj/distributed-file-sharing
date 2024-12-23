import { Socket } from "socket.io";
import { EventKey, EventRegistry } from "@/events.ts";

export type SocketHandlerFn<T extends EventKey> = (
  socket: Socket,
  payload: EventRegistry[T],
  ...args: unknown[]
) => void;


const createHandler =
  <T extends EventKey>(event: T, handler: SocketHandlerFn<T>) =>
  (socket: Socket) => {
    socket.on(event as string, (payload: EventRegistry[T], ...args: unknown[]) => {
      handler(socket, payload, ...args);
    });
  };

export { createHandler };