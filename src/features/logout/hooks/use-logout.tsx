import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { removeFromStorage } from "@/shared/helpers/tokens";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = getQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const privateRoutes = [
    "/settings",
    "/basket",
    "/orders",
    "/admin",
    "/repairman",
  ];
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname?.includes(route),
  );

  const { mutate } = useMutation({
    mutationFn: userApi.logout,
    mutationKey: ["logout"],
    onSuccess: () => {
      if (isPrivateRoute) {
        router.push("/");
      }
      removeFromStorage();
      toast.success("Выход был выполнен успешно");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
    onError: () => {
      toast.error("Произошла непредвиденная ошибка");
    },
  });

  return { mutate };
}
