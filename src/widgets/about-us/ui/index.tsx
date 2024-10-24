import { Image } from "@nextui-org/react";
import { Rabbit, SquareDashed, User } from "lucide-react";
import { AboutUsCard } from "./card";

export function AboutUsContent() {
  return (
    <main className="grid xl:grid-cols-2 gap-16">
      <div className="flex flex-col">
        <h3 className="text-xl uppercase text-primary font-bold">
          Почему выбирают нас
        </h3>
        <h2 className="text-2xl lg:text-4xl font-bold">
          Вам не нужно беспокоиться о качестве ремонта
        </h2>
        <div className="grid gap-6 mt-4">
          <AboutUsCard
            icon={<User className="min-w-5 lg:w-8 min-h-5 lg:h-8" />}
            title="Профессионализм и опыт"
            desc="Наша компания обладает командой сертифицированных специалистов с многолетним опытом."
          />
          <AboutUsCard
            icon={<SquareDashed className="min-w-5 lg:w-8 min-h-5 lg:h-8" />}
            title="Честность и прозрачность"
            desc="Каждый этап ремонта сопровождается подробными объяснениями, включая необходимость замены комплектующих и расчёт затрат."
          />
          <AboutUsCard
            icon={<Rabbit className="min-w-5 lg:w-8 min-h-5 lg:h-8" />}
            title="Быстрота обслуживания"
            desc="Время клиента ценно, поэтому наша старается минимизировать сроки ремонта."
          />
        </div>
      </div>
      <Image
        src="/repairman.jpg"
        removeWrapper
        className="hidden xl:block w-full h-full"
      />
    </main>
  );
}
