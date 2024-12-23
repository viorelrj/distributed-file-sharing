
export const REGISTER = "REGISTER" as const;
export const UPLOAD = "UPLOAD" as const;

export type EventRegistry = {
  [REGISTER]: { id: string };
  [UPLOAD]: number;
};

export type EventKey = keyof EventRegistry;

export const createEventPayload = <T extends EventKey>(_ev: T, payload: EventRegistry[T]) => payload;
