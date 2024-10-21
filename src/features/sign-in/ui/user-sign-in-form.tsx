import { api } from "@/shared/axios";
import { getQueryClient } from "@/shared/helpers/get-query-client";
import { saveTokenStorage } from "@/shared/helpers/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useMutation } from "@tanstack/react-query";
import { LockIcon, MailIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }),
  password: z.string().min(1, { message: "Введите пароль" }),
  remember: z.boolean(),
});

async function signIn({ email, password }: FormData) {
  return api.post("/auth/users/sign-in", { email, password });
}

type FormData = z.infer<typeof formSchema>;

export function UserSignInForm({ onClose }: { onClose: () => void }) {
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
      remember: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => signIn(data),
    mutationKey: ["sign-in"],
    onSuccess: ({ data }) => {
      saveTokenStorage(data.access_token);
      toast.success("Добро пожаловать!");
      onClose();
    },
    onError: () => {
      toast.error("Неверная почта или пароль");
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
        <Link color="primary" href="#" size="sm">
          Забыли пароль?
        </Link>
      </div>
      <div className="flex justify-end gap-2">
        <Button color="danger" variant="flat" onPress={onClose}>
          Закрыть
        </Button>
        <Button color="primary" type="submit" isLoading={mutation.isPending}>
          Войти
        </Button>
      </div>
    </form>
  );
}