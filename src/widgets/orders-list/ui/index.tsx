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

  return (
    <ul className="flex flex-col gap-4 w-full">
      {orders?.data &&
        orders?.data.map((item: IOrder) => (
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
