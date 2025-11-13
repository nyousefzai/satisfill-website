"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnMount: true,
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
    },
  });
}

export default function Providers({ children }: { children: ReactNode }) {
  // Use useState to ensure the QueryClient is only created once per client session
  // This prevents context issues during SSR and static generation
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors theme="light" />
    </QueryClientProvider>
  );
}
