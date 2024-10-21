import { userApi } from "@/entities/user";
import { FormData } from "../ui/place-order-form";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePlaceOrder() {
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => userApi.placeOrder(data),
    mutationKey: ["place-order"],
    onSuccess: () => {
      toast.success("Заказ успешно оформлен. Ожидайте одобрения");
    },
    onError: () => {
      toast.error("Не удалось оформить заказ");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });
  return { mutate, isPending };
}
