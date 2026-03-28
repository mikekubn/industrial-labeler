/**
 * Extended options for making API requests
 */
export interface FetchOptions extends Omit<RequestInit, "headers"> {
  /**
   * Headers to include in the request
   */
  headers?: Record<string, string>;
  /**
   * Whether to include authorization headers in the request
   */
  noAuthorization?: boolean;
  /**
   * Whether to return a blob response
   */
  blob?: boolean;
}

/**
 * CRUD operation result
 */
export type CrudResult<T> = T | null;

/**
 * Base service configuration
 */
export interface BaseServiceConfig {
  /**
   * Base URL for API requests
   */
  baseUrl: string;
}
