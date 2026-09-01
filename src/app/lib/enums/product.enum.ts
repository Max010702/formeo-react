export const ProductStatus = {
  PAUSE: "PAUSE",
  PROCESS: "PROCESS",
  DELETE: "DELETE",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export const ProductCategories = {
  SOFAS: "SOFAS",
  CHAIRS: "CHAIRS",
  TABLES: "TABLES",
  BEDS: "BEDS",
  WARDROBES: "WARDROBES",
  BOOKSHELVES: "BOOKSHELVES",
  DESKS: "DESKS",
  DECOR: "DECOR",
  LIGHTING: "LIGHTING",
  OTHER: "OTHER",
} as const;

export type ProductCategories =
  (typeof ProductCategories)[keyof typeof ProductCategories];

export const ProductColor = {
  BLACK: "BLACK",
  WHITE: "WHITE",
  GRAY: "GRAY",
  BROWN: "BROWN",
  NAVY: "NAVY",
  RED: "RED",
  GOLD: "GOLD",
  SILVER: "SILVER",
  PINK: "PINK",
  GREEN: "GREEN",
  BEIGE: "BEIGE",
  CREAM: "CREAM",
  WALNUT: "WALNUT",
  OAK: "OAK",
  NATURAL_WOOD: "NATURAL_WOOD",
} as const;

export type ProductColor = (typeof ProductColor)[keyof typeof ProductColor];

export const ProductMaterial = {
  WOOD: "WOOD",
  METAL: "METAL",
  GLASS: "GLASS",
  FABRIC: "FABRIC",
  LEATHER: "LEATHER",
  RATTAN: "RATTAN",
  PLASTIC: "PLASTIC",
  VELVET: "VELVET",
} as const;

export type ProductMaterial =
  (typeof ProductMaterial)[keyof typeof ProductMaterial];
