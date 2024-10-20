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
