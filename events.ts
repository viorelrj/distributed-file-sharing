export const REGISTER = "REGISTER" as const;
export const TRANSFER = "TRANSFER" as const;

export type EventRegistry = {
  [REGISTER]: { id: string };
  [TRANSFER]: { id: string; data: Uint8Array };
};

export type EventKey = keyof EventRegistry;

export const createEventPayload = <T extends EventKey>(
  _ev: T,
  payload: EventRegistry[T],
) => payload;
