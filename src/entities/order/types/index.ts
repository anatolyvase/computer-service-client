import { IService } from "@/entities/service";

export interface IOrderItem extends IService {
  count: number;
}

export interface IOrder {
  id: string;
  services: IOrderItem[];
  repairmanId: string | null;
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
