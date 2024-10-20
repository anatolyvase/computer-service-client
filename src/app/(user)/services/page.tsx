import { serviceApi } from "@/entities/service";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { PageLayout } from "@/shared/ui/page-layout";
import { ServicesList } from "@/widgets/services-list";
import {
  HydrationBoundary,
  dehydrate,
  queryOptions,
} from "@tanstack/react-query";
import React from "react";

export const servicesOptions = queryOptions({
  queryKey: ["services"],
  queryFn: serviceApi.fetchServices,
  staleTime: 1000 * 60 * 5,
});

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
