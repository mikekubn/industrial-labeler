import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a new QueryClient instance for server-side prefetching.
 * Each server component render should create its own instance.
 *
 * @param options - Optional QueryClient configuration options
 * @returns A new QueryClient instance
 */
export const getServerQueryClient = (options?: ConstructorParameters<typeof QueryClient>[0]): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60 * 1000,
        ...options?.defaultOptions?.queries
      }
    },
    ...options
  });
};
