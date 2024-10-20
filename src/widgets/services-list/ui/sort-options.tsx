import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import type { SharedSelection } from "@nextui-org/react";
import React from "react";

export function SortOptions() {
  const sortOptions: Record<string, string> = {
    most_popular: "Популярные",
    cheapest: "Дешевые",
    most_expensive: "Дорогие",
  };
  const [value, setValue] = React.useState<string>("most_popular");

  const selectedValue = React.useMemo(() => sortOptions[value], [value]);
  const handleSelectionChange = (keys: SharedSelection) => {
    setValue(keys.currentKey ?? "most_popular");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize w-fit">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[value]}
        onSelectionChange={handleSelectionChange}
      >
        {Object.entries(sortOptions).map(([key, value]) => (
          <DropdownItem key={key}>{value}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
