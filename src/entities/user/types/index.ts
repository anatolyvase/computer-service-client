import { IService } from "@/entities/service";

export interface IUser {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  role: string;
}

export interface IBasketItem extends IService {
  count: number;
  createdAt: string;
}
export interface IBasket {
  count: number;
  items: IBasketItem[];
}

export interface IAddress {
  id: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  zip: string;
}
