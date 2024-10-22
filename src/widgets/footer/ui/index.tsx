import { ThemeToggle } from "@/widgets/header/ui/theme-toggle";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="w-full flex justify-center border-t bg-content1 border-divider mt-8 p-6 text-foreground-400">
      <div className="max-w-screen-xl mx-auto w-full gap-4 flex flex-col">
        <div className="flex gap-4 justify-between">
          <div className="space-x-4">
            <Link href="#">+7 (999) 999-99-99</Link>
            <Link href="#">@Контакт</Link>
          </div>
          <ThemeToggle />
        </div>
        <nav className="grid grid-cols-2 lg:flex text-sm gap-4 justify-between">
          <Link href="/">Главная</Link>
          <Link href="/services">Список услуг</Link>
          <Link href="/#about-us">О нас</Link>
          <Link href="/#reviews">Отзывы</Link>
          <Link href="#">О защите труда</Link>
          <Link href="#">Стать мастером</Link>
          <Link href="#">Блог</Link>
          <Link href="#">Политика кофиденциальности</Link>
        </nav>
      </div>
    </footer>
  );
}
