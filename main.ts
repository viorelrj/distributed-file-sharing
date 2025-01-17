import { Server } from "socket.io";
import { withRegister } from "@/handlers/register.ts";
import { withTransfer } from "@/handlers/transfer.ts"
import { parseArgs } from "jsr:@std/cli/parse-args";
import { io } from "socket.io-client";
import { REGISTER } from "@/events.ts";


const { runType, serverPort, fileName } = parseArgs(Deno.args, {
  string: ["runType", "serverPort", "fileName"],
});

const dependencies = {
  readFile: Deno.readFile,
  writeFile: Deno.writeFile
};


const port = serverPort ? Number(serverPort) : undefined;

if (runType === 'server') {
  const listener = new Server(port ?? 3000);

  listener.on("connection", (socket) => {
    withRegister(socket, dependencies);
  });
} else {
  const socket = io(`ws://localhost:${port}`);

  withTransfer(socket, dependencies);

  socket.emit(REGISTER, {id: fileName})
}


// const socket = io('ws://localhost:3000')
// socket.on('upload', async (bytes) => await Deno.writeFile("hello.txt", bytes, { mode: 0o644 }))
// socket.emit('register')
