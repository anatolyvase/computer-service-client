import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";

export function PlaceOrderForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <Select placeholder="Выберите способы оплаты" label="Способ оплаты">
        <SelectItem key="1">1</SelectItem>
      </Select>
      <Select placeholder="Выберите Ваш адрес" label="Адрес">
        <SelectItem key="1">1</SelectItem>
      </Select>
      <div className="flex justify-end gap-2">
        <Button color="danger" variant="flat" onPress={onClose}>
          Закрыть
        </Button>
        <Button color="primary" type="submit">
          Оформить
        </Button>
      </div>
    </form>
  );
}
