import { Platform } from "react-native";

import { extractEnvVariableToString } from "./validation";

const LOOPBACK = new Set(["localhost", "127.0.0.1"]);

const EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE = extractEnvVariableToString(
  "EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE",
  process.env.EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE
);

const androidUseAdbReverse = Platform.OS === "android" && EXPO_PUBLIC_ANDROID_USE_ADB_REVERSE === "1";

const rewriteLoopbackHostname = (url: URL) => {
  if (!LOOPBACK.has(url.hostname)) {
    return;
  }

  if (Platform.OS !== "android") {
    return;
  }

  // Best path for Android USB device / emulator when adb reverse is enabled
  if (androidUseAdbReverse) {
    url.hostname = "127.0.0.1";
    return;
  }

  // Fallback for Android emulator without adb reverse
  url.hostname = "10.0.2.2";
};

const resolveLocalhostUrlForNative = (baseUrl: string): string => {
  if (Platform.OS === "web") {
    return baseUrl;
  }

  try {
    const url = new URL(baseUrl);
    rewriteLoopbackHostname(url);
    return url.toString().replace(/\/$/, "");
  } catch {
    return baseUrl;
  }
};

const resolveBackendOriginForNative = (origin: string): string => {
  if (Platform.OS === "web") {
    return origin;
  }

  try {
    const url = new URL(origin);
    rewriteLoopbackHostname(url);
    return url.origin;
  } catch {
    return origin;
  }
};

export { resolveBackendOriginForNative, resolveLocalhostUrlForNative };
