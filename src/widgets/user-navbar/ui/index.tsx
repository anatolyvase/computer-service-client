"use client";

import { config } from "@/config";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

const { user: routes } = config.routes;
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
export function UserNavbar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-full hidden md:flex flex-col gap-4">
      <main className=" flex flex-col gap-1 sticky top-20">
        {links.map(({ label, href }, index) => (
          <Button
            key={index}
            size="lg"
            as={Link}
            radius="md"
            href={href}
            variant="light"
            className={twMerge(
              "pl-3 justify-start",
              pathname === href && "font-bold pointer-events-none",
            )}
          >
            {label}
          </Button>
        ))}
      </main>
    </aside>
  );
}

export function UserNavbarModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="bordered"
        className="flex md:hidden"
        isIconOnly
        onPress={onOpen}
      >
        <Menu />
      </Button>
      <Modal
        size="5xl"
        classNames={{
          base: "w-full sm:mx-0 sm:mb-0",
        }}
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="">
          {(onClose) => (
            <div className="py-6 flex flex-col space-y-4">
              {links.map(({ label, href }, index) => (
                <Link
                  key={index}
                  onClick={onClose}
                  href={href}
                  className={twMerge(
                    "pl-3 justify-start",
                    pathname === href && "font-bold pointer-events-none",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
