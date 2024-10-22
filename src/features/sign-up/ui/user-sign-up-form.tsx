import { api } from "@/shared/axios";
import { formatPhoneNumber } from "@/shared/helpers/format-phone-number";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { saveTokenStorage } from "@/shared/helpers/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LockIcon, MailIcon, Phone } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" }),
  firstName: z.string().min(1, { message: "Введите имя" }),
  lastName: z.string().min(1, { message: "Введите фамилию" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Введите телефон" })
    .max(10, { message: "Введите корректный телефон" }),
  remember: z.boolean(),
});

async function signUp(data: FormData) {
  const { remember, ...rest } = data;
  console.log(remember); // false
  return api.post("/auth/users/sign-up", rest);
}

type FormData = z.infer<typeof formSchema>;

export function UserSignUpForm({ onClose }: { onClose: () => void }) {
  const queryClient = getQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      remember: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => signUp(data),
    mutationKey: ["sign-in"],
    onSuccess: ({ data }) => {
      saveTokenStorage(data.access_token);
      toast.success("Вы успешно зарегистрировались!");
      onClose();
    },
    onError: () => {
      toast.error("Произошла ошибка при регистрации");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!errors.email}
            errorMessage={errors.email && errors.email.message}
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Почта"
            placeholder="Введите Вашу почту"
            variant="bordered"
          />
        )}
      />
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
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
      <div className="flex py-2 px-1 justify-between">
        <Controller
          name="remember"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              onChange={onChange}
              onBlur={onBlur}
              isSelected={value}
              classNames={{
                label: "text-small",
              }}
            >
              Запомнить меня
            </Checkbox>
          )}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button color="danger" variant="flat" onPress={onClose}>
          Закрыть
        </Button>
        <Button color="primary" type="submit" isLoading={mutation.isPending}>
          Создать аккаунт
        </Button>
      </div>
    </form>
  );
}
