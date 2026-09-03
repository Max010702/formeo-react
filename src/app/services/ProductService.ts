import axios from "axios";
import { serverApi } from "../lib/config";
import type { Product, ProductInquiry } from "../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${this.path}/product/all`, {
        params: {
          order: input.order,
          page: input.page,
          limit: input.limit,
          productCategories: input.productCategories,
          productColor: input.productColor,
          productMaterial: input.productMaterial,
          search: input.search,
        },
        withCredentials: true,
      });

      console.log("getProducts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error, getProducts:", error);
      throw error;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const response = await axios.get<Product>(
        `${this.path}/product/${productId}`,
        {
          withCredentials: true,
        },
      );

      console.log("getProduct:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error, getProduct:", error);
      throw error;
    }
  }
}

export default ProductService;
