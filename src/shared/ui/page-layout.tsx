import React from "react";
import { twMerge } from "tailwind-merge";

export function PageLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={twMerge(
        "flex-1 flex flex-col items-center min-h-[calc(100vh-4rem)]",
        className,
      )}
    >
      {children}
    </main>
  );
}
