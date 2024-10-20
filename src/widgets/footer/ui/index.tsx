import Link from "next/link";
import { Image } from "@nextui-org/image";
import React from "react";

export function Footer() {
  return (
    <footer className="w-full flex justify-center border-t border-divider">
      <main className="max-w-screen-xl p-6 w-full grid gap-8 place-content-center text-center md:text-start lg:place-content-start md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-1">
          <h5 className="text-lg text-foreground-400">Карта сайта</h5>
          <Link href="#">Главная</Link>
          <Link href="#">Список услуг</Link>
          <Link href="#">О нас</Link>
          <Link href="#">Отзывы</Link>
          <Link href="#">Личный кабинет</Link>
          <Link href="#">Личный кабинет</Link>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-lg text-foreground-400">Документы</h5>
          <Link href="#">Документ1</Link>
          <Link href="#">Документ2</Link>
          <Link href="#">Документ3</Link>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-lg text-foreground-400">Контакты</h5>
          <Link href="#">+7 (999) 999-99-99</Link>
          <Link href="#">@Контакт</Link>
        </div>
        <div className="grid">
          <Image src="/void.svg" alt="Logo" className="w-64 h-64" />
        </div>
      </main>
    </footer>
  );
}
