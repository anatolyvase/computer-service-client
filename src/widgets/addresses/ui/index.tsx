import { IAddress, useAddresses } from "@/entities/user";
import { useAddressDelete } from "@/features/address-delete";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { Trash } from "lucide-react";
import React from "react";

export function AddressesList() {
  const { data: addresses, isLoading, isError } = useAddresses();

  if (isLoading) {
    return (
      <div className="p-6 pt-0 space-y-4 w-full">
        <Skeleton className="w-full h-20 rounded-medium" />
        <Skeleton className="w-full h-20 rounded-medium" />
        <Skeleton className="w-full h-20 rounded-medium" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-1 p-6 pt-0 text-danger">
        Ошибка загрузки адресов
      </div>
    );
  }

  const data = addresses?.data as IAddress[];

  if (!data || data.length === 0) {
    return (
      <div className="space-y-1 p-6 pt-0 text-foreground-300">
        У вас нет сохраненных адресов
      </div>
    );
  }

  return (
    <div className="space-y-1 p-6 pt-0">
      {data.map((item) => (
        <AddressItem
          key={item.id}
          item={item}
          controls={<AddressControls id={item.id} />}
        />
      ))}
    </div>
  );
}

function AddressItem({
  item,
  controls,
}: {
  item: IAddress;
  controls?: React.ReactNode;
}) {
  return (
    <li className="bg-background p-4 h-20 flex justify-between rounded-medium border-1 border-divider items-center">
      <div className="flex flex-col">
        <span>
          {item.country}, {item.state}, {item.city}, {item.address1}{" "}
          {item.address2}
        </span>
        <span className="text-sm text-foreground-400">{item.zip}</span>
      </div>
      {controls}
    </li>
  );
}

function AddressControls({ id }: { id: string }) {
  const { mutate, isPending } = useAddressDelete();

  return (
    <div>
      <Button
        isIconOnly
        color="danger"
        onPress={() => mutate(id)}
        isLoading={isPending}
      >
        <Trash />
      </Button>
    </div>
  );
}
