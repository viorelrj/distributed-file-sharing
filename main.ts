import { Server } from "socket.io";
import { withRegister } from "@/handlers/register.ts";

const dependencies = {
  readFile: Deno.readFile,
};

const listener = new Server(3000);

listener.on("connection", (socket) => {
  withRegister(socket, dependencies);
});

// const socket = io('ws://localhost:3000')
// socket.on('upload', async (bytes) => await Deno.writeFile("hello.txt", bytes, { mode: 0o644 }))
// socket.emit('register')
