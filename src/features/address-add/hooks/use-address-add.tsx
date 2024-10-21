import { userApi } from "@/entities/user";
import { FormData } from "../ui/address-add-form";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddressAdd() {
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => userApi.addAddress(data),
    mutationKey: ["add-address"],
    onSuccess: () => {
      toast.success("Адрес добавлен");
    },
    onError: () => {
      toast.error("Не удалось добавить адрес");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { mutate, isPending };
}
