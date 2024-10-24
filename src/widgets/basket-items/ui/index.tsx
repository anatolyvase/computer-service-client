"use client";

import { useBasket } from "@/entities/user/hooks/use-basket";
import { IBasket, IBasketItem } from "@/entities/user/types";
import { useBasketItemAdd } from "@/features/add-in-basket";
import { useBasketItemRemove } from "@/features/remove-from-basket";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { Minus, Plus, RussianRuble } from "lucide-react";
import React from "react";

export function BasketItems() {
  const { data: basket, isLoading } = useBasket();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
        <Skeleton className="w-full h-[4.5rem] rounded-medium" />
      </div>
    );
  }

  const data = basket?.data as IBasket;

  if (!data || data.items.length === 0) {
    return (
      <div className="flex">
        <h1 className="text-2xl font-semibold">Корзина пуста</h1>
      </div>
    );
  }

  return (
    basket && (
      <div className="flex flex-col gap-2">
        {data.items
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              basketControls={
                <BasketControls id={item.id} count={item.count} />
              }
            />
          ))}
      </div>
    )
  );
}
interface Props {
  item: IBasketItem;
  basketControls?: React.ReactNode;
}
export const BasketItem = ({ item, basketControls }: Props) => {
  return (
    <div className="flex bg-content1 p-4 gap-2 rounded-medium border-1 border-divider">
      <div className="w-full flex justify-between gap-2 h-10">
        <div className="flex flex-col">
          <h4 className="font-bold">{item.name}</h4>
          <span className="flex text-primary text-sm items-center">
            {item.price} <RussianRuble className="w-3 h-3" />
          </span>
        </div>
        {basketControls}
      </div>
    </div>
  );
};

function BasketControls({ id, count }: { id: string; count: number }) {
  const { mutate: add, isPending: isAddPending } = useBasketItemAdd();
  const { mutate: remove, isPending: isRemovePending } = useBasketItemRemove();

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="sm"
        color="primary"
        onPress={() => remove(id)}
        isLoading={isRemovePending}
        isDisabled={isAddPending}
        isIconOnly
      >
        <Minus />
      </Button>
      <span className="w-6 text-center text-lg font-bold">{count}</span>
      <Button
        size="sm"
        color="primary"
        onPress={() => add(id)}
        isLoading={isAddPending}
        isIconOnly
        isDisabled={count > 99 || isRemovePending}
      >
        <Plus />
      </Button>
    </div>
  );
}
