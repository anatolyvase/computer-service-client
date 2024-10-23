import { IRepairman } from "@/entities/repairman";
import { IService } from "@/entities/service";

export interface IOrderItem extends IService {
  count: number;
}

export interface IOrder {
  id: string;
  userId: string;
  address: {
    id: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    zip: string;
  };
  services: IOrderItem[];
  repairmanId: string | null;
  repairman?: IRepairman;
  status: OrderStatus;
  paymentType: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  CANCELED = "CANCELED",
  DECLINED = "DECLINED",
  FINISHED = "FINISHED",
}
