"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { getServerQueryClient } from "@/lib/server-query-client";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => getServerQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { AppProviders };
