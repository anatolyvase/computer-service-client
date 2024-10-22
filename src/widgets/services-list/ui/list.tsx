"use client";

import { IService, ServiceCard } from "@/entities/service";
import { useBasket } from "@/entities/user/hooks/use-basket";
import { IBasket } from "@/entities/user/types";
import { useBasketItemAdd } from "@/features/add-in-basket";
import { useBasketItemRemove } from "@/features/remove-from-basket";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { Search, ShoppingCart, Trash } from "lucide-react";
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
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => (
          <ServiceCard
            basketControls={
              <BasketControls
                id={item.id}
                isInBasket={
                  !isBasketError && basketData
                    ? !!basketData.items.find((i) => i.id === item.id)
                    : false
                }
                isLoading={basketIsLoading}
              />
            }
            isDisableGrayscale
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
  isInBasket,
  isLoading,
}: {
  id: string;
  isInBasket: boolean;
  isLoading: boolean;
}) {
  const { mutate, isPending } = useBasketItemAdd();
  const { mutate: remove, isPending: isRemovePending } = useBasketItemRemove();

  return isLoading ? (
    <Skeleton className="w-10 h-10 rounded-medium" />
  ) : (
    <div className="flex gap-2">
      <Button
        onPress={() => mutate(id)}
        isLoading={isPending}
        variant="flat"
        color="primary"
        isIconOnly
      >
        <ShoppingCart />
      </Button>
      {isInBasket && (
        <Button
          color="danger"
          isIconOnly
          variant="flat"
          onPress={() => remove(id)}
          isLoading={isRemovePending}
        >
          <Trash />
        </Button>
      )}
    </div>
  );
}
