export const OrderStatus = {
  PAUSE: "PAUSE",
  PROCESS: "PROCESS",
  FINISH: "FINISH",
  DELETE: "DELETE",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
