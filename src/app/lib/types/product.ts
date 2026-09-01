import type {
  ProductCategories,
  ProductColor,
  ProductMaterial,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  productCollection: any;
  _id: string;
  productStatus: ProductStatus;
  productCategories: ProductCategories;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productColor: ProductColor;
  productMaterial: ProductMaterial;
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
  productCategories?: ProductCategories;
  productColor?: ProductColor;
  productMaterial?: ProductMaterial;
  search?: string;
}
