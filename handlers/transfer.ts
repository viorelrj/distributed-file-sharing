import { TRANSFER } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

interface Dependencies {
  writeFile: typeof Deno.writeFile;
}

const withTransfer = createHandler(
  TRANSFER,
  (_, payload, dependencies: Dependencies) => {
    dependencies.writeFile(`${payload.id}-copy`, payload.data);
  }
);

export const TRIGGER_EVENT = TRANSFER;
export { withTransfer };
