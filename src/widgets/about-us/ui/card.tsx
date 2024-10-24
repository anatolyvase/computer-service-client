import { Chip } from "@nextui-org/chip";
import React from "react";

export const AboutUsCard = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 items-start h-fit px-3 pt-3">
      <Chip
        variant="solid"
        color="primary"
        radius="md"
        classNames={{
          content:
            "p-0 flex justify-center items-center text-medium font-semibold",
        }}
        className="min-w-10 lg:min-w-16 min-h-10 lg:w-16 lg:h-16 text-center p-0 "
      >
        {icon}
      </Chip>
      <div>
        <h4 className="lg:text-xl font-bold">{title}</h4>
        <p className="text-small lg:text-medium">{desc}</p>
      </div>
    </div>
  );
};
