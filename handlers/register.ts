import { createEventPayload, REGISTER, TRANSFER } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

interface Dependencies {
  readFile: typeof Deno.readFile
}

const withRegister = createHandler(
  REGISTER,
  async (
    socket,
    payload,
    dependencies: Dependencies
  ) => {
    const data = await dependencies.readFile(payload.id);

    socket.emit(
      TRANSFER,
      createEventPayload(TRANSFER, {
        id: payload.id,
        data,
      })
    );
  }
);

export const TRIGGER_EVENT = REGISTER;
export { withRegister };
