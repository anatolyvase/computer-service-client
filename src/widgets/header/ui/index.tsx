import { config } from "@/config";
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

interface ILink {
  href: string;
  label: string;
}

const { user: routes } = config.routes;

const links: ILink[] = [
  {
    href: routes.HOME,
    label: "Главная",
  },
  {
    href: routes.SERVICES,
    label: "Услуги",
  },
  {
    href: routes.HOME + "#about-us",
    label: "О нас",
  },
  {
    href: routes.HOME + "#reviews",
    label: "Отзывы",
  },
  {
    href: routes.HOME + "#support",
    label: "Поддержка",
  },
];

export function Header() {
  return (
    <Navbar maxWidth="full" isBlurred={true}>
      <NavbarMenuToggle className="lg:hidden" />
      <NavbarBrand
        className="flex-grow-0 mr-4 hidden sm:flex"
        as={Link}
        href={routes.HOME}
      >
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-8">
        <NavbarItem>
          <Link href={routes.SERVICES} color="foreground">
            Услуги
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={routes.HOME + "#about-us"} aria-current="page">
            О нас
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={routes.HOME + "#reviews"} color="foreground">
            Отзывы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={routes.HOME + "#support"} color="foreground">
            Поддержка
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <RightButtons />
      </NavbarContent>
      <NavbarMenu>
        {links.map(({ label, href }, index) => (
          <NavbarMenuItem key={`${label}-${index}`}>
            <Link className="w-full" href={href}>
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
