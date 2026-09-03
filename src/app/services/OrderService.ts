import axios from "axios";

import { serverApi } from "../lib/config";
import type {
  Order,
  OrderInquiry,
  OrderRequest,
  OrderUpdateInput,
} from "../lib/types/order";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: OrderRequest[]): Promise<Order> {
    try {
      const response = await axios.post<Order>(
        `${this.path}/order/create`,
        input,
        {
          withCredentials: true,
        },
      );

      console.log("createOrder:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, createOrder:", error);
      throw error;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const response = await axios.get<Order[]>(`${this.path}/order/all`, {
        params: {
          page: input.page,
          limit: input.limit,
          orderStatus: input.orderStatus,
        },
        withCredentials: true,
      });

      console.log("getMyOrders:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, getMyOrders:", error);
      throw error;
    }
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    try {
      const response = await axios.post<Order>(
        `${this.path}/order/update`,
        input,
        {
          withCredentials: true,
        },
      );

      console.log("updateOrder:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, updateOrder:", error);
      throw error;
    }
  }
}

export default OrderService;
