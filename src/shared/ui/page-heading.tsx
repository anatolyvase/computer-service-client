import React from "react";

export function PageHeading({ title }: { title: string }) {
  return <header className="text-3xl font-bold">{title}</header>;
}
