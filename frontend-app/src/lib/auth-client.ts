import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { extractEnvVariableToString } from "./env";

const betterAuthUrl = extractEnvVariableToString("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL);
const betterAuthBasePath = extractEnvVariableToString(
  "NEXT_PUBLIC_BETTER_AUTH_BASE_PATH",
  process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_PATH
);

export const authClient = createAuthClient({
  baseURL: betterAuthUrl,
  basePath: betterAuthBasePath,
  plugins: [adminClient()],
  fetchOptions: {
    credentials: "include"
  }
});
