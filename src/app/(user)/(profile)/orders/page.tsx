import { PageLayout } from "@/shared/ui/page-layout";
import { OrdersList } from "@/widgets/orders-list";
import React from "react";

export default function OrdersPage() {
  return (
    <PageLayout className="items-start">
      <OrdersList />
    </PageLayout>
  );
}
