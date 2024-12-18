import { userApi } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryFn: userApi.getMe,
    queryKey: ["user"],
    retry: false,
  });
  return { data, isLoading, isSuccess, isError };
}
