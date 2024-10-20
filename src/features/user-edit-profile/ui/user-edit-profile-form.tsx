"use client";

import { userApi } from "@/entities/user";
import { useInitialData } from "@/features/user-edit-profile/hooks/use-initial-data";
import { formatPhoneNumber } from "@/shared/helpers/format-phone-number";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Введите имя" }),
  lastName: z.string().min(1, { message: "Введите фамилию" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Введите телефон" })
    .max(10, { message: "Введите корректный телефон" }),
});

export type FormData = z.infer<typeof formSchema>;

export function UserEditProfileForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const { isLoading } = useInitialData(reset);
  const queryClient = getQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => userApi.updateProfile(data),
    onSuccess: () => {
      toast.success("Ваш профиль был успешно обновлен");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Произошла непредвиденная ошибка");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 w-full">
        <Skeleton className="w-full h-14 rounded-medium" />
        <Skeleton className="w-full h-14 rounded-medium" />
        <Skeleton className="w-full h-14 rounded-medium" />
      </div>
    );
  }

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={formatPhoneNumber(value)}
            onBlur={onBlur}
            onValueChange={(val) => {
              const cleanedInput = val.replace(/\D/g, "");
              if (cleanedInput.length <= 10) {
                onChange(cleanedInput);
              }
            }}
            isInvalid={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber && errors.phoneNumber.message}
            startContent={<span className="text-sm text-default-400">+7</span>}
            endContent={
              <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Номер телефона"
            placeholder="(XXX) XXX-XX-XX"
            type="tel"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, onBlur, value, ...rest } }) => (
          <Input
            {...rest}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName && errors.firstName.message}
            label="Имя"
            placeholder="Введите Ваше имя"
            type="text"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName && errors.lastName.message}
            label="Фамилия"
            placeholder="Введите Вашу фамилию"
            type="text"
            variant="bordered"
          />
        )}
      />
      <div className="flex justify-end gap-2">
        <Button color="primary" type="submit" isLoading={isPending}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}
