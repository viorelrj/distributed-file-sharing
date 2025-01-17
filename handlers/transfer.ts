import { TRANSFER } from "@/events.ts";
import { createHandler } from "@/utils/createHandler.ts";

interface Dependencies {
  writeFile: typeof Deno.writeFile;
  basePath: string;
}

const withTransfer = createHandler(
  TRANSFER,
  (_, payload, dependencies: Dependencies) => {
    const { basePath } = dependencies;
    const { id, data } = payload;

    const destinationPath = `${basePath}/${id}`;

    dependencies.writeFile(destinationPath, data);
  },
);

export const TRIGGER_EVENT = TRANSFER;
export { withTransfer };
