import { serviceApi } from "@/entities/service";
import { queryOptions } from "@tanstack/react-query";

export const servicesOptions = queryOptions({
  queryKey: ["services"],
  queryFn: serviceApi.fetchServices,
  staleTime: 1000 * 60 * 5,
});
