import { createEventPayload, REGISTER, TRANSFER } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

interface Dependencies {
  readFile: typeof Deno.readFile;
  basePath: string;
}

const withRegister = createHandler(
  REGISTER,
  async (
    socket,
    payload,
    dependencies: Dependencies,
  ) => {
    const { basePath } = dependencies;
    const { id } = payload;

    const sourcePath = `${basePath}/${id}`;
    const data = await dependencies.readFile(sourcePath);

    socket.emit(
      TRANSFER,
      createEventPayload(TRANSFER, {
        id: payload.id,
        data,
      }),
    );
  },
);

export const TRIGGER_EVENT = REGISTER;
export { withRegister };
