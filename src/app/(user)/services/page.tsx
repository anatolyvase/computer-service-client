import { getQueryClient } from "@/shared/helpers/get-query-client";
import { PageLayout } from "@/shared/ui/page-layout";
import { ServicesList } from "@/widgets/services-list";
import { servicesOptions } from "@/widgets/services-list/ui/list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

export default function ServicesPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(servicesOptions);

  return (
    <PageLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ServicesList />
      </HydrationBoundary>
    </PageLayout>
  );
}
