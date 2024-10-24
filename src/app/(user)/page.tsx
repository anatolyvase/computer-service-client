import { FeedbackForm } from "@/features/feedback";
import { PageLayout } from "@/shared/ui/page-layout";
import { AboutUsContent } from "@/widgets/about-us";
import { OrderStepper } from "@/widgets/order-stepper";
import { Reviews } from "@/widgets/reviews";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout className="relative mt-6">
      <section className="relative px-6 flex flex-col justify-center gap-6 w-full max-w-[1536px] min-h-[calc(100vh-4rem-4rem)]">
        <Hero />
      </section>
      <section
        id="about-us"
        className="w-full flex flex-col px-6 max-w-[1536px] pt-48"
      >
        <AboutUsContent />
      </section>
      <section
        id="reviews"
        className="w-full flex flex-col px-6 max-w-[1536px] pt-48"
      >
        <Reviews />
      </section>
      <section
        id="reviews"
        className="w-full flex flex-col px-6 max-w-[1536px] pt-48"
      >
        <OrderStepper />
      </section>
      <section
        id="support"
        className="w-full flex flex-col gap-4 px-6 mb-48 max-w-[768px] pt-48"
      >
        <h2 className="text-4xl font-bold">Возникли вопросы?</h2>
        <FeedbackForm />
      </section>
    </PageLayout>
  );
}

function Hero() {
  return (
    <Card
      shadow="none"
      className="w-full flex-1 grid xl:grid-cols-[4fr_5fr] bg-transparent"
    >
      <CardHeader className="flex min-w-0 flex-col items-center p-6 px-12 gap-4">
        <div className="flex flex-col gap-4 items-center flex-1 justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-center leading-8">
            Профессиональная помощь и ремонт любой сложности.
          </h1>
          <p className="text-medium lg:text-lg font-medium text-center">
            В нашем сервисе работают высококвалифицированные специалисты,
            которые готовы помочь вам в любом вопросе, связанном с компьютером.
          </p>
          <Button
            size="lg"
            endContent={<ChevronRight />}
            as={Link}
            href="/services"
            className="mt-2"
            color="primary"
          >
            Перейти к услугам
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-4 w-full">
          <article className="h-24 flex w-28 flex-col items-center">
            <h4 className="text-4xl font-bold">1000+</h4>
            <p className="text-small text-foreground-400 text-center">
              Довольных клиентов
            </p>
          </article>
          <article className="h-24 w-28 flex flex-col items-center">
            <h4 className="text-4xl font-bold">20+</h4>
            <p className="text-small text-foreground-400 text-center">
              Профессиональных специалистов
            </p>
          </article>
          <article className="col-span-2 w-28 lg:col-span-1 h-24 flex flex-col items-center">
            <h4 className="text-4xl font-bold">2000+</h4>
            <p className="text-small text-foreground-400 text-center">
              Отремонтированных компьютеров
            </p>
          </article>
        </div>
      </CardHeader>
      <Image
        src="/land-repairman.jpg"
        alt="Background"
        removeWrapper
        className="hidden xl:block h-full rounded-l-none object-cover"
      />
    </Card>
  );
}
