import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { removeFromStorage } from "@/shared/helpers/tokens";
import { useMutation } from "@tanstack/react-query";
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
    onError: () => {
      toast.error("Произошла непредвиденная ошибка");
    },
  });

  return { mutate, isPending, isSuccess };
}
