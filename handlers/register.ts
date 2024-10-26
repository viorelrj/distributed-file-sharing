import { REGISTER, UPLOAD } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

const withRegister = createHandler(REGISTER, (socket) => {
  socket.emit(UPLOAD, 1);
});

export const TRIGGER_EVENT = REGISTER;
export { withRegister };
