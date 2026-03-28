import { extractEnvVariableToString } from "@/lib/env";

/**
 * Get API base URL from environment variables
 * @returns API base URL
 */
export const getApiBaseUrl = (): string => {
  return extractEnvVariableToString("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL);
};
