"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Skeleton } from "@nextui-org/skeleton";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="flex rounded-xl w-10 h-10" />;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem key="light" startContent={<Sun />}>
          Светлая
        </DropdownItem>
        <DropdownItem key="dark" startContent={<Moon />}>
          Тёмная
        </DropdownItem>
        <DropdownItem key="system" startContent={<Computer />}>
          Системная
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
