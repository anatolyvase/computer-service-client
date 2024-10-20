import { PageHeading } from "@/shared/ui/page-heading";
import { PageLayout } from "@/shared/ui/page-layout";
import { BasketItems } from "@/widgets/basket-items";
import { OrderPreview } from "@/widgets/order-preview";
import React from "react";

export default function BasketPage() {
  return (
    <PageLayout className="items-start py-6 gap-6">
      <PageHeading title="Корзина" />
      <div className="flex flex-col-reverse justify-end sm:justify-start sm:grid sm:grid-cols-[2fr_1fr] gap-6 w-full h-full">
        <BasketItems />
        <OrderPreview />
      </div>
    </PageLayout>
  );
}
