"use client";

import { IOrder, OrderStatus, UserOrderCard } from "@/entities/order";
import React from "react";

export function OrdersList() {
  const data: IOrder[] = [
    {
      id: "1",
      services: [
        {
          id: "1",
          name: "Замена диска",
          description: "Замена диска",
          isAvailable: true,
          imageUrl: "/repair.jpg",
          price: 1000,
          count: 1,
        },
      ],
      repairmanId: null,
      status: OrderStatus.PENDING,
      paymentType: "CASH",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
  ];
  return (
    <ul className="flex flex-col gap-4 w-full">
      {data &&
        data.map((item) => (
          <UserOrderCard
            key={item.id}
            item={item}
            controls={<div>controls</div>}
          />
        ))}
    </ul>
  );
}
