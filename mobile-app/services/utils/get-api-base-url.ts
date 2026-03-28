import { apiBaseUrl } from "@/constants/envs";
import { resolveLocalhostUrlForNative } from "@/lib/localhost-android";

/**
 * Get API base URL from environment variables
 * @returns API base URL
 */
export const getApiBaseUrl = () => {
  const url = resolveLocalhostUrlForNative(apiBaseUrl);
  return url;
};
