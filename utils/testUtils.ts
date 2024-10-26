import { Server, Socket } from "socket.io";
import { io as Client, Socket as ClientSocket } from "socket.io-client";

export type SocketHandler = (socket: Socket) => void;

export async function setupTest(
  handlers: SocketHandler[],
  port: number = 3000,
): Promise<{ clientSocket: ClientSocket; close: () => void }> {
  const io = new Server(port);

  io.on("connection", (socket) => {
    handlers.forEach((handler) => handler(socket));
  });

  const clientSocket = Client(`ws://localhost:${port}`);

  await new Promise<void>((resolve) => {
    clientSocket.on("connect", resolve);
  });

  return {
    clientSocket,
    close: () => {
      clientSocket.close();
      io.close();
    },
  };
}
