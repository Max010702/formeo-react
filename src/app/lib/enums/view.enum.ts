export const ViewGroup = {
  PRODUCT: "PRODUCT",
} as const;

export type ViewGroup = (typeof ViewGroup)[keyof typeof ViewGroup];
