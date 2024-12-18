import { IRepairman } from "@/entities/repairman";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import React from "react";
import { IOrder, IOrderItem, OrderStatus } from "../types";

type UserOrderCardProps = {
  item: IOrder;
  controls: React.ReactNode;
};
export function UserOrderCard({ item, controls }: UserOrderCardProps) {
  return (
    <Card>
      <CardHeader className="justify-between px-6 pt-6 relative">
        <div className="flex flex-col gap-2">
          <OrderStatusChip status={item.status} />
          <h4 className="text-2xl">
            Заказ{" от "}
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
          <span className="text-foreground-400">
            {item.address.country}, {item.address.state}, {item.address.city},{" "}
            {item.address.address1}, {item.address.address2}, {item.address.zip}
          </span>
        </div>
        <div className="absolute right-6 top-6">{controls}</div>
      </CardHeader>
      <CardBody className="flex flex-col gap-2 px-6">
        {item.services.map((service) => (
          <OrderServiceItem key={service.id} item={service} />
        ))}
      </CardBody>
      <CardFooter className="px-6 justify-between pb-6">
        <RepairmanInfo repairman={item.repairman} />
        <h5 className="text-lg">
          Итого:{" "}
          <span className="text-primary">
            {item.services
              .reduce((acc, item) => acc + item.count * item.price, 0)
              .toLocaleString("ru-RU") + " ₽"}
          </span>
        </h5>
      </CardFooter>
    </Card>
  );
}

function OrderServiceItem({ item }: { item: IOrderItem }) {
  return (
    <li className="bg-background p-4 sm:h-20 grid sm:grid-cols-2 rounded-medium gap-2 border-1 border-divider items-center">
      <div className="flex flex-col">
        <h5 className="text-lg">{item.name}</h5>
        <p className="text-foreground-400 text-nowrap">{item.description}</p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <span className="text-sm sm:text-end text-foreground-400">
          {item.price.toLocaleString("ru-RU")} ₽
        </span>
        <span className="text-sm sm:text-end text-foreground-400">
          {item.count} шт.
        </span>
        <span className="sm:text-end">
          {(item.price * item.count).toLocaleString("ru-RU")} ₽
        </span>
      </div>
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

function RepairmanInfo({ repairman }: { repairman?: IRepairman }) {
  if (!repairman) {
    return <span className="text-foreground-400">Не назначен</span>;
  }

  const { profile } = repairman;

  return (
    <User
      name={`Мастер: ${profile.lastName} ${profile.firstName}`}
      description={
        <Link
          color="primary"
          className="text-sm"
          href={`tel:+7${profile.phoneNumber}`}
        >
          Позвонить
        </Link>
      }
      avatarProps={{
        src: profile.avatarUrl,
      }}
    />
  );
}
