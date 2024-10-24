import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useBasketItemRemove() {
  const queryClient = getQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (serviceId: string) =>
      userApi.removeServiceFromBasket(serviceId),
    mutationKey: ["remove-basket-item"],
    onSuccess: () => {
      toast.success("Услуга была успешно удалена из корзины");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
    onError: (err: AxiosError) => {
      if (err.status === 401) {
        toast.error("Вы не авторизованы");
        return;
      }
      toast.error("Произошла непредвиденная ошибка");
    },
  });

  return { mutate, isPending, isSuccess };
}
