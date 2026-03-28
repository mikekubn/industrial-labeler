import { extractEnvVariableToString } from "@/lib/validation";

const apiBaseUrl = extractEnvVariableToString("EXPO_PUBLIC_API_BASE_URL", process.env.EXPO_PUBLIC_API_BASE_URL);
const basePath = extractEnvVariableToString(
  "EXPO_PUBLIC_BETTER_AUTH_BASE_PATH",
  process.env.EXPO_PUBLIC_BETTER_AUTH_BASE_PATH
);

export { apiBaseUrl, basePath };
