import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import { Platform } from "react-native";

import { createAuthClient } from "better-auth/react";

import { expoClient, getCookie, normalizeCookieName } from "@better-auth/expo/client";
import { apiBaseUrl, basePath } from "@/constants/envs";

import { resolveBackendOriginForNative } from "./localhost-android";

/** Must match `scheme` / `storagePrefix` passed to {@link expoClient}. */
const AUTH_EXPO_SCHEME = "mobile-app";
const AUTH_EXPO_STORAGE_PREFIX = "mobile-app";

const origin = resolveBackendOriginForNative(apiBaseUrl.replace(/\/$/, ""));
const normalizedPath = basePath.startsWith("/") ? basePath : `/${basePath}`;
const baseURL = `${origin}${normalizedPath}`;

const cookieStorageKey = normalizeCookieName(`${AUTH_EXPO_STORAGE_PREFIX}_cookie`);

/**
 * Headers aligned with the Better Auth Expo client so API `fetch` calls reuse the
 * same session cookie and origin hints as {@link authClient} sign-in requests.
 */
const getBetterAuthFetchHeaders = (): Record<string, string> => {
  if (Platform.OS === "web") {
    return {};
  }
  const raw = SecureStore.getItem(cookieStorageKey);
  const cookie = getCookie(raw || "{}");
  const headers: Record<string, string> = {
    "expo-origin": Linking.createURL("", { scheme: AUTH_EXPO_SCHEME }),
    "x-skip-oauth-proxy": "true"
  };
  if (cookie) {
    headers.cookie = cookie;
  }
  return headers;
};

const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: AUTH_EXPO_SCHEME,
      storagePrefix: AUTH_EXPO_STORAGE_PREFIX,
      storage: SecureStore
    })
  ]
});

type AuthClientSession = ReturnType<typeof authClient.useSession>["data"];

export { type AuthClientSession, authClient, getBetterAuthFetchHeaders };
