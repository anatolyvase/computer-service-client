import { userApi } from "@/entities/user";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddressDelete() {
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (addressId: string) => userApi.removeAddress(addressId),
    mutationKey: ["delete-address"],
    onSuccess: () => {
      toast.success("Адрес удален");
    },
    onError: () => {
      toast.error("Не удалось удалить адрес");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { mutate, isPending };
}
