"use client";

import { config } from "@/config";
import { useLogout } from "@/features/logout";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

export function UserNavbar() {
  const { user: routes } = config.routes;
  const pathname = usePathname();
  const links = [
    {
      href: routes.ORDERS,
      label: "Заказы",
    },
    {
      href: routes.SETTINGS,
      label: "Настройки",
    },
    {
      href: routes.BASKET,
      label: "Корзина",
    },
  ];

  const { mutate } = useLogout();

  return (
    <aside className="min-h-full flex flex-col gap-4 p-6">
      <header className="text-xl font-bold">Личный кабинет</header>
      <main className=" flex flex-col gap-1">
        {links.map(({ label, href }, index) => (
          <Button
            key={index}
            size="lg"
            as={Link}
            radius="none"
            href={href}
            variant="light"
            color={pathname === href ? "primary" : "default"}
            className={twMerge(
              "pl-3 justify-start",
              pathname === href && "font-bold pointer-events-none",
            )}
          >
            {label}
          </Button>
        ))}
      </main>
      <footer className="flex justify-center">
        <Button className="w-full" variant="flat" onPress={() => mutate()}>
          Выйти
        </Button>
      </footer>
    </aside>
  );
}
