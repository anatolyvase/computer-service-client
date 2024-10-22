import { useProfile } from "@/entities/user";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import type { FormData } from "../ui/user-edit-account-form";

export function useInitialData(reset: UseFormReset<FormData>) {
  const { data, isSuccess, isLoading } = useProfile();

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data);
      reset({
        password: "",
        newPassword: "",
      });
    }
  }, [isSuccess]);

  return {
    isLoading,
  };
}
