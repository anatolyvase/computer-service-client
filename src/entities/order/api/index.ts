import { api } from "@/shared/axios";

class OrderApi {
  async cancel(id: string) {
    return api.post(`/orders/${id}/cancel`);
  }
}

export const orderApi = new OrderApi();
