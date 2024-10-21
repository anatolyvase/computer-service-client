import { IAddress, useAddresses } from "@/entities/user";
import { useAddressDelete } from "@/features/address-delete";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import React from "react";

export function AddressesList() {
  const { data: addresses, isLoading, isError } = useAddresses();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки адресов</div>;
  }

  const data = addresses?.data as IAddress[];

  return (
    data && (
      <div className="space-y-1">
        {data.map((item) => (
          <AddressItem
            key={item.id}
            item={item}
            controls={<AddressControls id={item.id} />}
          />
        ))}
      </div>
    )
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
    <li className="bg-content1 p-4 h-20 flex justify-between rounded-medium border-1 border-divider items-center">
      <div className="flex flex-col">
        <span>
          {item.country}, {item.state}, {item.city}, {item.address1},
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
