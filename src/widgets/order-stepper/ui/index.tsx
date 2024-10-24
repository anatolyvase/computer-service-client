import { Step } from "./step";
import { Image } from "@nextui-org/react";

export function OrderStepper() {
  return (
    <main className="grid xl:grid-cols-2 gap-16">
      <Image
        src="/repairmans.jpg"
        className="hidden xl:block w-full h-full"
        removeWrapper
      />
      <div className="flex flex-col">
        <h3 className="text-xl uppercase text-primary font-bold">
          Как заказать услуги
        </h3>
        <h2 className="text-2xl lg:text-4xl font-bold">
          Вызвать мастера на дом никогда не было настолько просто
        </h2>
        <div className="relative flex mt-4">
          <ol className="relative z-10 items-center w-full h-96 grid rtl:space-x-reverse">
            <Step
              num={1}
              title="Выберите услугу или услуги"
              description="На странице Услуги есть большой перечень услуг. Вы всегда найдете что Вас интересует"
            />
            <Step
              num={2}
              title="Перейдите в корзину и начните оформлять заказ"
              description="Уточните адрес куда должен приехать мастер и другие детали"
            />
            <Step
              num={3}
              title="Ожидайте звонка от мастера"
              description="Мастер позвонит Вам и уточнит все детали заказа"
            />
          </ol>
        </div>
      </div>
    </main>
  );
}
