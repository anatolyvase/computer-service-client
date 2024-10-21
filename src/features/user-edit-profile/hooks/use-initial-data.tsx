import { useProfile } from "@/entities/user";
import React, { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import type { FormData } from "../ui/user-edit-profile-form";

export function useInitialData(reset: UseFormReset<FormData>) {
  const { data, isSuccess, isLoading } = useProfile();

  useEffect(() => {
    if (isSuccess && data) {
      reset({
        firstName: data.data.profile.firstName,
        lastName: data.data.profile.lastName,
        phoneNumber: data.data.profile.phoneNumber,
      });
    }
  }, [isSuccess]);

  return { isLoading };
}
