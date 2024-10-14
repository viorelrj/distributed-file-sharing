import { Server } from 'socket.io';
import { registerHandler } from "./utils/register.ts";

const listener = new Server(3000);


const REGISTER = 'register';
const UPLOAD = 'upload';


listener.on('connection', socket => {
  registerHandler(socket, REGISTER, async (socket) => {
    console.log('a-1');
    const bytes = await Deno.readFile("myFile.txt");
    socket.emit(UPLOAD, bytes);
  })
})


// const socket = io('ws://localhost:3000')
// socket.on('upload', async (bytes) => await Deno.writeFile("hello.txt", bytes, { mode: 0o644 }))
// socket.emit('register')