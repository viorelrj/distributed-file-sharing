import { assertEquals } from "@std/assert";
import { TRIGGER_EVENT, withRegister } from "@/handlers/register.ts";
import { setupTest } from "@/utils/testUtils.ts";
import { UPLOAD } from "@/events.ts";
import { REGISTER } from "@/events.ts";

Deno.test(
  `withRegister handler responds correctly to ${REGISTER} event`,
  async () => {
    const { clientSocket, close } = await setupTest([withRegister]);

    const uploadEvent = Promise.withResolvers();
    clientSocket.on(UPLOAD, uploadEvent.resolve);
    clientSocket.emit(TRIGGER_EVENT);
    const uploadData = await uploadEvent.promise;

    assertEquals(uploadData, 1);
    close();
  },
);
