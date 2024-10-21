import { IService } from "@/entities/service";
import { IAddress } from "@/entities/user";
import { usePlaceOrder } from "@/features/place-order/hooks/use-place-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  addressId: z.string().min(1, { message: "Выберите адрес" }),
  paymentType: z.string().min(1, { message: "Выберите способ оплаты" }),
  services: z.array(z.string()).min(1, { message: "Выберите услугу" }),
});

export type FormData = z.infer<typeof formSchema>;

export function PlaceOrderForm({
  onClose,
  addresses,
  services,
}: {
  onClose: () => void;
  addresses: IAddress[];
  services: IService[];
}) {
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: services.map((service) => service.id),
    },
  });

  const { mutate, isPending } = usePlaceOrder();

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="paymentType"
        control={control}
        render={({ field, formState: { errors } }) => (
          <Select
            onBlur={field.onBlur}
            selectedKeys={[field.value]}
            onSelectionChange={(items) => field.onChange(items.currentKey)}
            isInvalid={!!errors.paymentType}
            disallowEmptySelection
            errorMessage={errors?.paymentType?.message}
            placeholder="Выберите способы оплаты"
            label="Способ оплаты"
          >
            <SelectItem key="CASH">Наличными</SelectItem>
            <SelectItem key="CARD">Картой</SelectItem>
          </Select>
        )}
      />
      <Controller
        name="addressId"
        control={control}
        render={({ field, formState: { errors } }) => {
          return addresses.length > 0 ? (
            <Select
              onBlur={field.onBlur}
              selectedKeys={[field.value]}
              onSelectionChange={(items) => field.onChange(items.currentKey)}
              disallowEmptySelection
              isInvalid={!!errors.addressId}
              errorMessage={errors?.addressId?.message}
              items={addresses}
              placeholder="Выберите Ваш адрес"
              label="Адрес"
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item?.data?.id} className="flex flex-col">
                    <span>
                      {item?.data?.country}, {item?.data?.state},{" "}
                      {item?.data?.city}, {item?.data?.address1},
                      {item?.data?.address2}
                    </span>
                  </div>
                ));
              }}
            >
              {(item) => (
                <SelectItem textValue={item.zip} key={item.id} value={item.id}>
                  <div className="flex flex-col">
                    <span>
                      {item.country}, {item.state}, {item.city}, {item.address1}
                      ,{item.address2}
                    </span>
                    <span className="text-sm text-foreground-400">
                      {item.zip}
                    </span>
                  </div>
                </SelectItem>
              )}
            </Select>
          ) : (
            <div className="flex flex-col items-center">
              У вас нет добавленных адресов
              <Button color="primary" as={Link} href="/settings/#add-address">
                Добавить
              </Button>
            </div>
          );
        }}
      />
      <div className="flex justify-end gap-2">
        <Button color="danger" variant="flat" onPress={onClose}>
          Закрыть
        </Button>
        <Button
          isLoading={isPending}
          color="primary"
          type="submit"
          isDisabled={!addresses.length || !services.length}
        >
          Оформить
        </Button>
      </div>
    </form>
  );
}
