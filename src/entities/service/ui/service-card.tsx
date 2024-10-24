"use client";

import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IService } from "../types";

type ServiceCardProps = {
  item: IService;
  basketControls?: React.ReactNode;
  className?: string;
};
export function ServiceCard({
  item,
  className,
  basketControls,
}: ServiceCardProps) {
  return (
    <Card className={"min-h-[400px] " + className}>
      <Image
        removeWrapper
        alt="Card background"
        className={twMerge("z-0 w-full h-[250px] object-cover")}
        src={item.imageUrl}
      />
      <CardHeader className="px-4 flex-1 flex-col items-start">
        <div className="flex w-full justify-between items-center">
          <span className="text-xl font-bold">
            {item.price.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-tiny text-foreground/60 uppercase font-bold">
            {item.name}
          </span>
        </div>
        <h4 className="text-lg">{item.description}</h4>
      </CardHeader>
      <CardFooter className="px-4 pb-4">{basketControls}</CardFooter>
    </Card>
  );
}
