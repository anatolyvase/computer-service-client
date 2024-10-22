import { serviceApi } from "@/entities/service";
import { PageHeading } from "@/shared/ui/page-heading";
import { PageLayout } from "@/shared/ui/page-layout";
import { ServicesList } from "@/widgets/services-list";
import { QueryClient } from "@tanstack/react-query";

export default async function ServicesPage() {
  const queryClient = new QueryClient();

  const services = await queryClient.fetchQuery({
    queryKey: ["services"],
    queryFn: serviceApi.fetchServices,
  });

  return (
    <PageLayout>
      <PageHeading title="Наши услуги" />
      <ServicesList services={services.data} />
    </PageLayout>
  );
}
