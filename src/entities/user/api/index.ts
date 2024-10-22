import { authApi } from "@/shared/axios";
import type { FormData as OrderData } from "@/features/place-order";
import type { FormData as AddressData } from "@/features/address-add";
import type { FormData as UpdateProfile } from "@/features/user-edit-profile";

class UserApi {
  async getMe() {
    return authApi.get("/users/me");
  }

  async logout() {
    return authApi.post("/auth/logout");
  }

  async updateProfile(data: UpdateProfile) {
    return authApi.patch("/users/me/profile", data);
  }

  async changePassword(password: string, newPassword: string) {
    return authApi.patch("/auth/users/change-password", {
      password,
      newPassword,
    });
  }

  async fetchBasket() {
    return authApi.get("/users/me/basket");
  }

  async addServiceToBasket(serviceId: string) {
    return authApi.patch("/users/me/basket/add/" + serviceId);
  }

  async removeServiceFromBasket(serviceId: string) {
    return authApi.patch("/users/me/basket/remove/" + serviceId);
  }

  async clearBasket() {
    return authApi.patch("/users/me/basket/clear");
  }

  async placeOrder(data: OrderData) {
    return authApi.post("/orders", data);
  }

  async fetchAddresses() {
    return authApi.get("/users/me/addresses");
  }

  async addAddress(data: AddressData) {
    return authApi.post("/users/me/addresses", data);
  }

  async removeAddress(addressId: string) {
    return authApi.delete("/users/me/addresses/" + addressId);
  }
}

export const userApi = new UserApi();
