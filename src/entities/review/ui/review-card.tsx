import { IUser } from "@/entities/user";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { User } from "@nextui-org/user";

export const ReviewCard = ({
  content,
  rating,
  date,
  user,
}: {
  content: string;
  rating: number;
  date: Date;
  user: IUser;
}) => {
  return (
    <Card>
      <CardHeader className="justify-between">
        <Rating rating={rating} />
        <span className="text-foreground-400">{date.toLocaleDateString()}</span>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>
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

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) =>
        rating >= index + 1 ? (
          <svg
            key={index}
            className="w-4 h-4 ms-1 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ) : (
          <svg
            key={index}
            className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ),
      )}
    </div>
  );
};
