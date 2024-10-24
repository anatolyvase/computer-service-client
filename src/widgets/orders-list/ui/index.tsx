"use client";

import {
  IOrder,
  OrderStatus,
  useOrders,
  UserOrderCard,
} from "@/entities/order";
import { useOrderCancel } from "@/features/cancel-order";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export function OrdersList() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-4 w-full">
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
      </ul>
    );
  }

  const data = orders?.data as IOrder[];

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-semibold">Нет заказов</h1>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((item) => (
          <UserOrderCard
            key={item.id}
            item={item}
            controls={<OrderControls id={item.id} status={item.status} />}
          />
        ))}
    </ul>
  );
}

function OrderControls({ id, status }: { id: string; status: OrderStatus }) {
  const { mutate, isPending } = useOrderCancel();
  return (
    <Button
      size="sm"
      isDisabled={
        status === OrderStatus.CANCELED ||
        status === OrderStatus.FINISHED ||
        status === OrderStatus.DECLINED
      }
      isLoading={isPending}
      onPress={() => mutate(id)}
      color="warning"
    >
      Отменить
    </Button>
  );
}
