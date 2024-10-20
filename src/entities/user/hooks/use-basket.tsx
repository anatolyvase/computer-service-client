import { userApi } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useBasket() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryFn: userApi.fetchBasket,
    queryKey: ["basket"],
    retry: (count, err) => (err as AxiosError).status !== 401 && count < 3,
  });
  return { data, isLoading, isSuccess, isError };
}
