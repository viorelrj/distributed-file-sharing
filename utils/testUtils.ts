import { Server } from "socket.io";
import { io as Client, Socket as ClientSocket } from "socket.io-client";
import { SocketHandler } from "@/utils/createHandler.ts";
import { EventKey } from "@/events.ts";

export const setupTest = async <T extends EventKey, D>(
  handler: SocketHandler<D>,
  dependencies: D,
  port: number = 3000,
): Promise<{ clientSocket: ClientSocket; close: () => void }> => {
  const io = new Server(port);

  io.on("connection", socket => {
    handler(socket, dependencies);
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
