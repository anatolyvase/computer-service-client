"use client";

import { useProfile, userApi } from "@/entities/user";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useInitialData } from "../hooks/use-initial-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { LockIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(1, { message: "Введите пароль" }),
  newPassword: z.string().min(1, { message: "Введите пароль" }),
});

export type FormData = z.infer<typeof formSchema>;

export function UserEditAccountForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const { data: profile, isLoading } = useProfile();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      userApi.changePassword(data.password, data.newPassword),
    onSuccess: () => {
      toast.success("Ваш пароль был успешно обновлен");
    },
    onError: (err) => {
      // @ts-ignore
      if (err.status === 409) {
        toast.error("Неверный пароль");
        return;
      }
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
      </div>
    );
  }

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Пароль"
            placeholder="Введите Ваш пароль"
            type="password"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Новый пароль"
            placeholder="Введите Ваш новый пароль"
            type="password"
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
