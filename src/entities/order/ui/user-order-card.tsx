import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import React from "react";
import { IOrder, IOrderItem, OrderStatus } from "../types";

type UserOrderCardProps = {
  item: IOrder;
  controls: React.ReactNode;
};
export function UserOrderCard({ item, controls }: UserOrderCardProps) {
  return (
    <Card>
      <CardHeader className="justify-between px-6 pt-6">
        <div className="flex flex-col gap-2">
          <OrderStatusChip status={item.status} />
          <h4 className="text-2xl">
            Заказ{" "}
            <span className="text-foreground-400">
              {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                minute: "numeric",
                hour: "numeric",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </span>
          </h4>
        </div>
        {controls}
      </CardHeader>
      <CardBody className="justify-between">
        {item.services.map((service) => (
          <OrderServiceItem key={service.id} item={service} />
        ))}
      </CardBody>
    </Card>
  );
}

function OrderServiceItem({ item }: { item: IOrderItem }) {
  return (
    <li className="bg-background p-4 h-20 flex justify-between rounded-medium border-1 border-divider items-center">
      <div className="flex flex-col">
        <h5 className="text-lg">{item.name}</h5>
        <p className="text-foreground-400">{item.description}</p>
      </div>
      <span className="text-sm text-foreground-400">
        {item.price.toLocaleString("ru-RU")} ₽
      </span>
      <span className="text-sm text-foreground-400">{item.count} шт.</span>
      <span>{(item.price * item.count).toLocaleString("ru-RU")} ₽</span>
    </li>
  );
}

const OrderStatusChip = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return (
        <Chip size="sm" color="default">
          В обработке
        </Chip>
      );
    case OrderStatus.FINISHED:
      return (
        <Chip size="sm" color="success">
          Завершен
        </Chip>
      );
    case OrderStatus.CANCELED:
      return (
        <Chip size="sm" color="danger">
          Отменен
        </Chip>
      );
    case OrderStatus.ACCEPTED:
      return (
        <Chip size="sm" color="primary">
          Принят
        </Chip>
      );
    case OrderStatus.DECLINED:
      return (
        <Chip size="sm" color="danger">
          Отклонен
        </Chip>
      );
    case OrderStatus.IN_PROGRESS:
      return (
        <Chip size="sm" color="warning">
          В процессе
        </Chip>
      );
    default:
      return null;
  }
};
