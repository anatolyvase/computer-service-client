import { api } from "@/shared/axios";

class ServiceApi {
  async fetchServices() {
    return api.get("/services");
  }
}

export const serviceApi = new ServiceApi();
