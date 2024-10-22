"use client";

import { IOrder, useOrders, UserOrderCard } from "@/entities/order";
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
        orders.data.map((item: IOrder) => (
          <UserOrderCard
            key={item.id}
            item={item}
            controls={<div>controls</div>}
          />
        ))}
    </ul>
  );
}
