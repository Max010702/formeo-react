export const ProductSize = {
  COMPACT: "COMPACT",
  STANDARD: "STANDARD",
  LARGE: "LARGE",
  MODULAR: "MODULAR",
  SET: "SET",
} as const;

export type ProductSize = (typeof ProductSize)[keyof typeof ProductSize];

export const ProductMaterial = {
  SOLID_WOOD: "SOLID_WOOD",
  VENEER: "VENEER",
  METAL: "METAL",
  GLASS: "GLASS",
  STONE: "STONE",
  FABRIC: "FABRIC",
  LEATHER: "LEATHER",
  RATTAN: "RATTAN",
  MIXED: "MIXED",
} as const;

export type ProductMaterial =
  (typeof ProductMaterial)[keyof typeof ProductMaterial];

export const ProductStatus = {
  ACTIVE: "ACTIVE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  PAUSED: "PAUSED",
  DISCONTINUED: "DISCONTINUED",
  DELETED: "DELETED",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export const ProductCollection = {
  LIVING_ROOM: "LIVING_ROOM",
  DINING_ROOM: "DINING_ROOM",
  BEDROOM: "BEDROOM",
  HOME_OFFICE: "HOME_OFFICE",
  OUTDOOR: "OUTDOOR",
  LIGHTING: "LIGHTING",
  DECOR: "DECOR",
  OTHER: "OTHER",
} as const;

export type ProductCollection =
  (typeof ProductCollection)[keyof typeof ProductCollection];
