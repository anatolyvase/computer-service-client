import { IUser } from "../types";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
type Props = {
  user: IUser;
  onLogout: () => void;
};

export function UserMenu({ user, onLogout }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={user.profile.avatarUrl}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem textValue="profile" key="profile" className="h-14 gap-2">
          <p className="font-semibold">Вы вошли как</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" href="/settings">
          Настройки
        </DropdownItem>
        <DropdownItem key="orders" href="/orders">
          Заказы
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={onLogout}>
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
