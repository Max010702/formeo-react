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
      let url =
        `${this.path}/product/all` +
        `?order=${input.order}` +
        `&page=${input.page}` +
        `&limit=${input.limit}`;

      if (input.productCategories) {
        url += `&productCategories=${input.productCategories}`;
      }

      if (input.productColor) {
        url += `&productColor=${input.productColor}`;
      }

      if (input.productMaterial) {
        url += `&productMaterial=${input.productMaterial}`;
      }

      if (input.search) {
        url += `&search=${encodeURIComponent(input.search)}`;
      }

      const result = await axios.get<Product[]>(url);

      console.log("getProducts:", result.data);

      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get<Product>(url);

      console.log("getProduct:", result.data);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
