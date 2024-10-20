import React from "react";

import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useBasketClear() {
  const queryClient = getQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: userApi.clearBasket,
    mutationKey: ["clear-basket-item"],
    onSuccess: () => {
      toast.success("Корзина была успешно очищена");
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
