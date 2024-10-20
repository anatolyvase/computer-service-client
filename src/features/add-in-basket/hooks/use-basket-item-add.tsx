import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useBasketItemAdd() {
  const queryClient = getQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (serviceId: string) => userApi.addServiceToBasket(serviceId),
    mutationKey: ["add-basket-item"],
    onSuccess: () => {
      toast.success("Услуга была успешно добавлена в корзину");
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
