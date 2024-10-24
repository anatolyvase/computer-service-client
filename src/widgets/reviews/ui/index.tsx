import { ReviewCard } from "@/entities/review";

const content1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function Reviews() {
  return (
    <main className="flex flex-col">
      <h3 className="text-xl uppercase text-primary font-bold">Отзывы</h3>
      <h2 className="text-2xl lg:text-4xl font-bold">
        Что говорят о нас клиенты
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ReviewCard
            key={index}
            content={content1}
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
    </main>
  );
}
