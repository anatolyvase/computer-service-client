import { IUser } from "@/entities/user";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { User } from "@nextui-org/user";

export const ReviewCard = ({
  content,
  user,
}: {
  content: string;
  user: IUser;
}) => {
  return (
    <Card className="bg-transparent" shadow="none">
      <CardBody className="px-6 pt-6 italic outline-0 lg:text-lg">
        {content}
      </CardBody>
      <CardFooter className="px-6 pb-6 justify-center">
        <User
          name={`${user.profile.lastName} ${user.profile.firstName}`}
          avatarProps={{
            src: user.profile.avatarUrl,
          }}
        />
      </CardFooter>
    </Card>
  );
};
