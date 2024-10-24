"use client";

import { IService, ServiceCard } from "@/entities/service";
import { useBasket } from "@/entities/user/hooks/use-basket";
import { IBasket } from "@/entities/user/types";
import { useBasketItemAdd } from "@/features/add-in-basket";
import { useBasketItemRemove } from "@/features/remove-from-basket";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { Minus, Plus, Search, ShoppingCart } from "lucide-react";
import React from "react";
import { SortOptions } from "./sort-options";

export function ServicesList({ services }: { services: IService[] }) {
  const {
    data: basket,
    isLoading: basketIsLoading,
    isError: isBasketError,
  } = useBasket();

  const basketData = basket?.data as IBasket;

  return (
    <div className="w-full max-w-screen-2xl p-6 flex flex-col gap-4">
      <div className="grid grid-cols-2">
        <SortOptions />
        <Input
          startContent={<Search />}
          placeholder="Поиск"
          className="max-w-96 justify-self-end"
        />
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((item) => (
          <ServiceCard
            basketControls={
              <BasketControls
                id={item.id}
                count={basketData?.items.find((i) => i.id === item.id)?.count}
                isInBasket={
                  !isBasketError && basketData
                    ? !!basketData.items.find((i) => i.id === item.id)
                    : false
                }
                isLoading={basketIsLoading}
              />
            }
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

function BasketControls({
  id,
  count,
  isInBasket,
  isLoading,
}: {
  id: string;
  count?: number;
  isInBasket: boolean;
  isLoading: boolean;
}) {
  const { mutate: add, isPending: isAddPending } = useBasketItemAdd();
  const { mutate: remove, isPending: isRemovePending } = useBasketItemRemove();

  if (isLoading) {
    return <Skeleton className="w-full h-10 rounded-medium" />;
  }

  if (isInBasket) {
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
        <span className="w-6 text-center text-lg font-bold">{count || 0}</span>
        <Button
          size="sm"
          color="primary"
          onPress={() => add(id)}
          isLoading={isAddPending}
          isIconOnly
          isDisabled={(!!count && count > 99) || isRemovePending}
        >
          <Plus />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        onPress={() => add(id)}
        isLoading={isAddPending}
        startContent={<ShoppingCart />}
        color="primary"
      >
        В корзину
      </Button>
    </div>
  );
}
