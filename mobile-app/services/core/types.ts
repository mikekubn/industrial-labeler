/**
 * Shared types for API services and {@link BaseFetcher}.
 */
type CrudResult<T> = T | null;

type BaseServiceConfig = {
  baseUrl: string;
};

type FetchOptions = RequestInit & {
  blob?: boolean;
};

export type { BaseServiceConfig, CrudResult, FetchOptions };
