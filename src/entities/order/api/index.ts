import { api } from "@/shared/axios";

class OrderApi {
  async cancel(id: string) {
    return api.patch(`/orders/${id}/cancel`);
  }
}

export const orderApi = new OrderApi();
