import { assertEquals } from "@std/assert";
import { TRIGGER_EVENT, withRegister } from "@/handlers/register.ts";
import { setupTest } from "@/utils/testUtils.ts";
import { createEventPayload, UPLOAD } from "@/events.ts";

Deno.test(
  `withRegister handler responds correctly to ${TRIGGER_EVENT} event`,
  async () => {
    const { clientSocket, close } = await setupTest([withRegister]);

    const uploadEvent = Promise.withResolvers();
    clientSocket.on(UPLOAD, uploadEvent.resolve);
    clientSocket.emit(
      TRIGGER_EVENT,
      createEventPayload(TRIGGER_EVENT, { id: "hehe" })
    );
    const uploadData = await uploadEvent.promise;

    assertEquals(uploadData, 1);
    close();
  }
);
