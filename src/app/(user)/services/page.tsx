import { serviceApi } from "@/entities/service";
import { PageLayout } from "@/shared/ui/page-layout";
import { ServicesList } from "@/widgets/services-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ServicesPage() {
  const queryClient = new QueryClient();

  const services = await queryClient.fetchQuery({
    queryKey: ["services"],
    queryFn: serviceApi.fetchServices,
  });

  return (
    <PageLayout>
      <ServicesList services={services.data} />
    </PageLayout>
  );
}
