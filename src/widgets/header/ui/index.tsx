import { Logo } from "@/shared/ui/logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import React from "react";
import { RightButtons } from "./right-buttons";

export function Header() {
  const menuItems = [
    "Главная",
    "О нас",
    "Список услуг",
    "Отзывы",
    "Наши мастера",
    "Поддержка",
  ];

  return (
    <Navbar maxWidth="full" isBlurred={true}>
      <NavbarMenuToggle className="lg:hidden" />
      <NavbarBrand
        className="flex-grow-0 mr-4 hidden sm:flex"
        as={Link}
        href="/"
      >
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-8">
        <NavbarItem>
          <Link color="foreground" href="/services">
            Услуги
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/#about-us" aria-current="page">
            О нас
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/#reviews">
            Отзывы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/#support">
            Поддержка
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <RightButtons />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
