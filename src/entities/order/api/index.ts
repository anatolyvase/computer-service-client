import { authApi } from "@/shared/axios";

class OrderApi {
  async cancel(id: string) {
    return authApi.patch(`/orders/${id}/cancel`);
  }
}

export const orderApi = new OrderApi();
