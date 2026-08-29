import type {
  ProductCollection,
  ProductMaterial,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
  weight?: number;
  unit: "CM" | "IN";
}

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productMaterial: ProductMaterial;
  productDimensions: ProductDimensions;
  productColor?: string;
  productDesc?: string;
  productImages: string[];
  productView: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  productMaterial?: ProductMaterial;
  productSize?: ProductSize;
  minimumPrice?: number;
  maximumPrice?: number;
  search?: string;
}
