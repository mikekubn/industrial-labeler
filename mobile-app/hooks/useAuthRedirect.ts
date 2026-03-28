import type { AuthClientSession } from "@/lib/auth-client";

import { useRouter, useSegments } from "expo-router";

import { useEffect } from "react";

import { isAuthenticated } from "@/lib/isAuthenticated";

const useAuthRedirect = (session: AuthClientSession) => {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const root = segments[0];

    if (root === undefined) {
      return;
    }

    const onSignIn = root === "sign-in";
    const loggedIn = isAuthenticated(session);

    if (!loggedIn && !onSignIn) {
      router.replace("/sign-in");
    } else if (loggedIn && onSignIn) {
      router.replace("/(tabs)");
    }
  }, [router, segments, session]);
};

export { useAuthRedirect };
