"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { RussianRuble, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IService } from "../types";

type ServiceCardProps = {
  item: IService;
  isDisableGrayscale?: boolean;
  basketControls?: React.ReactNode;
  className?: string;
};
export function ServiceCard({
  item,
  className,
  basketControls,

  isDisableGrayscale,
}: ServiceCardProps) {
  return (
    <Card className={"h-[300px] group " + className}>
      <Chip
        className="top-2 left-2 absolute z-10 rounded-xl bg-opacity-40 backdrop-blur-xl group-hover:bg-opacity-100 transition-opacity"
        color="primary"
        classNames={{
          content: "text-sm w-fit flex items-center justify-center px-2 ",
        }}
      >
        {item.price.toLocaleString("ru-RU")}
        <RussianRuble className="w-4 h-4" />
      </Chip>
      <div className="absolute top-2 right-2 z-10">{basketControls}</div>
      <Image
        removeWrapper
        alt="Card background"
        className={twMerge(
          "z-0 w-full data-[loaded=true]:opacity-50 group-hover:data-[loaded=true]:opacity-100  h-full object-cover",
          !isDisableGrayscale &&
            "dark:grayscale transition-[filter_.23s_ease-in-out] group-hover:grayscale-0",
        )}
        src={item.imageUrl}
      />
      <div className="absolute z-10 bottom-2 px-2 w-full">
        <CardHeader className="backdrop-blur-xl bg-background rounded-2xl bg-opacity-40 flex-col !items-start">
          <p className="text-tiny text-foreground/60 uppercase font-bold">
            {item.name}
          </p>
          <h4 className="text-lg font-bold">{item.description}</h4>
        </CardHeader>
      </div>
    </Card>
  );
}
