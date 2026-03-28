import { QueryClient } from "@tanstack/react-query";

/**
 * App-wide TanStack Query client. Use in {@link QueryClientProvider}.
 */
const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1
      }
    }
  });

export { getQueryClient };
