import React from "react";

export function PageHeading({
  title,
  endContent,
}: {
  title: string;
  endContent?: React.ReactNode;
}) {
  return (
    <header className="flex min-w-full border-b border-divider py-[40px]">
      <div className="mx-auto px-6 text-4xl w-full flex justify-between max-w-screen-2xl font-medium">
        {title}
        {endContent}
      </div>
    </header>
  );
}
