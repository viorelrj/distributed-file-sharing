import { REGISTER, UPLOAD } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

type payload = string;
type REGISTER = {
  type: 'register',
  payload: payload
}

const withRegister = createHandler(REGISTER, (socket, payload) => {
  console.log(payload.id);
  socket.emit(UPLOAD, 1);
});

export const TRIGGER_EVENT = REGISTER;
export { withRegister };
