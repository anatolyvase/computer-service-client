import { orderApi } from "@/entities/order";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOrderCancel() {
  const queryClient = getQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) => orderApi.cancel(id),
    mutationKey: ["cancel-order"],
    onSuccess: () => {
      toast.success("Заказ был успешно отменён");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Произошла непредвиденная ошибка");
    },
  });

  return { mutate, isPending, isSuccess };
}
