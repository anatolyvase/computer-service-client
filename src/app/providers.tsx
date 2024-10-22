"use client";

import { getQueryClient } from "@/shared/helpers/get-query-client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = getQueryClient();
  return (
    <NextUIProvider className="min-h-screen" navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
