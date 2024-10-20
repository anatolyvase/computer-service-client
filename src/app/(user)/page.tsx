import { FeedbackForm } from "@/features/feedback";
import { PageLayout } from "@/shared/ui/page-layout";
import { AboutUsContent } from "@/widgets/about-us";
import { Reviews } from "@/widgets/reviews";
import { ServicesPreviewList } from "@/widgets/services-list";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <section className="px-6 flex flex-col gap-6 w-full max-w-[1536px]">
        <HomeHeader />
        <ServicesPreviewList />
      </section>
      <section
        id="about-us"
        className="w-full flex flex-col gap-4 px-6 max-w-[1536px] pt-48"
      >
        <h2 className="text-4xl font-bold">О нас</h2>
        <AboutUsContent />
      </section>
      <section
        id="reviews"
        className="w-full flex flex-col gap-4 px-6 max-w-[1536px] pt-48"
      >
        <h2 className="text-4xl font-bold">Отзывы</h2>
        <Reviews />
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

function HomeHeader() {
  return (
    <Card className="relative h-[calc(100vh/2)] grid shadow-none bg-transparent outline-transparent items-center">
      <CardHeader className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-center">Компьютерный сервис</h1>
        <h2 className="text-2xl font-medium text-center">
          Профессиональная помощь и ремонт любой сложности
        </h2>
        <Button
          endContent={<ChevronRight />}
          as={Link}
          href="/services"
          className="mt-2"
          color="primary"
        >
          Перейти к услугам
        </Button>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full rounded-none object-cover data-[loaded=true]:opacity-10"
        src="/land.jpg"
      />
    </Card>
  );
}
