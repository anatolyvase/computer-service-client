import { ReviewCard } from "@/entities/review";

const content1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const content2 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";

export function Reviews() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <ReviewCard
          key={index}
          content={index % 2 === 0 ? content2 : content1}
          date={new Date()}
          rating={5}
          user={{
            id: "1",
            email: "a@a.ru",
            profile: {
              firstName: "Иван",
              lastName: "Иванов",
              avatarUrl: "",
            },
            role: "USER",
          }}
        />
      ))}
    </div>
  );
}
