"use client";

import { useAddressAdd } from "@/features/address-add/hooks/use-address-add";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  city: z
    .string()
    .min(3, { message: "Введите город" })
    .max(50, { message: "Некорректное название города" }),
  address1: z
    .string()
    .min(3, { message: "Введите адрес" })
    .max(50, { message: "Некорректный адрес" }),
  address2: z
    .string()
    .min(3, { message: "Введите адрес" })
    .max(50, { message: "екорректный адрес" }),
  zip: z
    .string()
    .min(3, { message: "Введите индекс" })
    .max(50, { message: "Некорректный индекс" }),
  country: z
    .string()
    .min(3, { message: "Введите страну" })
    .max(50, { message: "Некорректное название страны" }),
  state: z
    .string()
    .min(3, { message: "Введите регион" })
    .max(50, { message: "Некорректное название региона" }),
});

export type FormData = z.infer<typeof formSchema>;

export function AddressAddForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      zip: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const { mutate, isPending } = useAddressAdd();

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset({
      country: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      zip: "",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.country}
            errorMessage={errors.country && errors.country.message}
            label="Страна"
            placeholder="Введите Вашу страну"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.state}
            errorMessage={errors.state && errors.state.message}
            label="Регион"
            placeholder="Введите Ваш регион"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.city}
            errorMessage={errors.city && errors.city.message}
            label="Город"
            placeholder="Введите Вашу город"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="address1"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.address1}
            errorMessage={errors.address1 && errors.address1.message}
            label="Адрес 1"
            placeholder="Введите Ваш адрес"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="address2"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.address2}
            errorMessage={errors.address2 && errors.address2.message}
            label="Адрес 2"
            placeholder="Введите Ваш адрес"
            variant="bordered"
          />
        )}
      />
      <Controller
        name="zip"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.zip}
            errorMessage={errors.zip && errors.zip.message}
            label="Почтовый индекс"
            placeholder="Введите Ваш почтовый индекс"
            variant="bordered"
          />
        )}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={isPending}>
          Добавить
        </Button>
      </div>
    </form>
  );
}
