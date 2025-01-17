import { Server } from "socket.io";
import { withRegister } from "@/handlers/register.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { withTransfer } from "@/handlers/transfer.ts";
import { io } from "socket.io-client";
import { REGISTER } from "@/events.ts";

const { source, filename, port } = parseArgs(Deno.args, {
  string: ["source", "filename", "port"],
});

const dependencies = {
  readFile: Deno.readFile,
  writeFile: Deno.writeFile,
};

const listener = new Server(port ? Number(port) : 3000);
listener.on("connection", (socket) => {
  withRegister(socket, {
    ...dependencies,
    basePath: "./testFiles/from",
  });
});

if (source) {
  const socket = io(`ws://${source}`);
  withTransfer(socket, {
    ...dependencies,
    basePath: "./testFiles/to",
  });
  socket.emit(REGISTER, { id: filename });
}
