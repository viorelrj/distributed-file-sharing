import { Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket } from "socket.io-client";
import { EventKey, EventRegistry } from "@/events.ts";

type Socket = ClientSocket | ServerSocket;

type SocketHandlerDeclaration<T extends EventKey, D> = (
  socket: Socket,
  payload: EventRegistry[T],
  dependencies: D,
) => void;

export type SocketHandler<D = unknown> = (
  socket: Socket,
  dependenceis: D,
) => void;

const createHandler = <T extends EventKey, D>(
  event: T,
  handler: SocketHandlerDeclaration<T, D>,
) => {
  const fn = (socket: Socket, dependencies: D) => {
    socket.on(
      event as string,
      (payload: EventRegistry[T]) => {
        handler(socket, payload, dependencies);
      },
    );
  };

  return fn as SocketHandler<D>;
};

export { createHandler };
