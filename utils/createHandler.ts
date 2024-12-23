import { Socket } from "socket.io";
import { EventKey, EventRegistry } from "@/events.ts";

type SocketHandlerDeclaration<T extends EventKey, D> = (
  socket: Socket,
  payload: EventRegistry[T],
  dependencies: D,
) => void;


export type SocketHandler<D = unknown> = (socket: Socket, dependenceis: D) => void;

const createHandler =
  <T extends EventKey, D>(event: T, handler: SocketHandlerDeclaration<T, D>) => {
    const fn = (socket: Socket, dependencies: D) => {
      socket.on(
        event as string,
        (payload: EventRegistry[T], ...args: unknown[]) => {
          handler(socket, payload, dependencies);
        }
      );
    };

    return fn as SocketHandler<D>;

  }

export { createHandler };