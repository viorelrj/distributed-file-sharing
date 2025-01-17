import { assertEquals } from "@std/assert";
import { withRegister } from "@/handlers/register.ts";
import { setupTest } from "@/utils/testUtils.ts";
import { createEventPayload, REGISTER, TRANSFER } from "@/events.ts";
import { Buffer } from "node:buffer";

Deno.test(
  `withRegister handler responds correctly to ${REGISTER} event`,
  async () => {
    const data = new Uint8Array([1, 2, 3]);
    const id = "hehe";

    const { clientSocket, close } = await setupTest(withRegister, {
      readFile: () => Promise.resolve(Buffer.from(data)),
      basePath: "",
    });

    const uploadEvent = Promise.withResolvers();
    clientSocket.on(TRANSFER, uploadEvent.resolve);

    clientSocket.emit(
      REGISTER,
      createEventPayload(REGISTER, { id }),
    );
    const uploadData = await uploadEvent.promise;

    assertEquals(
      uploadData,
      createEventPayload(TRANSFER, {
        id,
        data: Buffer.from(data),
      }),
    );
    close();
  },
);
