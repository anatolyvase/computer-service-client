import { userApi } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

export function useAddresses() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: userApi.fetchAddresses,
    queryKey: ["addresses"],
  });
  return { data, isLoading, isError, isSuccess };
}
