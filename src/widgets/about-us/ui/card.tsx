import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

export const AboutUsCard = ({
  title,
  desc,
  num,
}: {
  title: string;
  desc: string;
  num: number;
}) => {
  return (
    <Card>
      <div className="flex gap-2 h-12 items-center px-3 pt-3">
        <Chip
          variant="solid"
          color="primary"
          classNames={{
            content: "p-0 text-medium font-semibold",
          }}
          className="min-w-8 max-w-8 text-center p-0 h-8"
        >
          {num}
        </Chip>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <CardBody>
        <p>{desc}</p>
      </CardBody>
    </Card>
  );
};
