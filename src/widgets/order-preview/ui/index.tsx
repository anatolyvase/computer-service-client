"use client";

import { useBasket } from "@/entities/user/hooks/use-basket";
import { IBasket } from "@/entities/user/types";
import { useBasketClear } from "@/features/clear-basket";
import { PlaceOrderModal } from "@/widgets/place-order-modal";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { RussianRuble } from "lucide-react";
import React from "react";

export function OrderPreview() {
  const { data: basket, isLoading } = useBasket();
  const { mutate, isPending } = useBasketClear();

  const data = basket?.data as IBasket;

  if (isLoading) {
    return <Skeleton className="w-full h-[176px] rounded-medium" />;
  }

  const totalPrice = data?.items
    .reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0)
    .toLocaleString("ru-RU");

  return (
    <aside className="h-fit">
      <Card className="">
        <CardHeader className="text-4xl font-bold">
          {totalPrice} <RussianRuble />
        </CardHeader>
        <CardFooter className="grid gap-2">
          <PlaceOrderModal />
          <Button
            variant="bordered"
            onPress={() => mutate()}
            isLoading={isPending}
          >
            Очистить корзину
          </Button>
        </CardFooter>
      </Card>
    </aside>
  );
}
