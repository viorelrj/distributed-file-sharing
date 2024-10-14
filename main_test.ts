import { assertEquals } from "@std/assert";
import { io } from "socket.io-client";
import { Server} from "socket.io";
import { assertSpyCalls, spy } from "@std/testing/mock";

const getTestSuite = (fn, data) => {
  const listener = new Server(3000);
  listener.on("connection", socket => {
    socket.on('event', fn(data))
  });

  const client = io('ws://localhost:3000');
  client.emit('event', data);
}

Deno.test("sanity test", () => {
  getTestSuite( => {}, 'hehe', 2);
  assertEquals(x, 3);
});