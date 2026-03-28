import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";

import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import "react-native-reanimated";

import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useColorScheme } from "@/hooks/useColorScheme";
import { authClient } from "@/lib/auth-client";
import { getQueryClient } from "@/lib/query-client";

export { ErrorBoundary } from "expo-router";

import { Toaster } from "sonner-native";

export const unstable_settings = {
  initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono
  });
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const [queryClient] = useState(() => getQueryClient());

  const colorScheme = useColorScheme();
  useAuthRedirect(session);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !sessionPending) {
      SplashScreen.hideAsync();
    }
  }, [loaded, sessionPending]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false, animation: "fade" }} />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "formSheet",
                    title: "Informace o uživateli",
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.6, 1],
                    sheetInitialDetentIndex: 0,
                    sheetCornerRadius: 16
                  }}
                />
              </Stack>
              <Toaster position="top-center" richColors closeButton />
            </ThemeProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
