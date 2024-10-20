import { PageHeading } from "@/shared/ui/page-heading";
import { PageLayout } from "@/shared/ui/page-layout";
import React from "react";

export default function OrdersPage() {
  return (
    <PageLayout className="items-start py-6">
      <PageHeading title="Заказы" />
    </PageLayout>
  );
}
