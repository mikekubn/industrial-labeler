import { Tabs, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";

import { Pressable } from "react-native";

import { AndroidTabIcon } from "@/components/AndoridTabIcon";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { useColorScheme } from "@/hooks/useColorScheme";
import { authClient } from "@/lib/auth-client";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const tint = Colors[colorScheme].tint;
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          marginBottom: 20
        },
        headerRight: () => (
          <Pressable
            accessibilityLabel="Informace o uživateli"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.push("/modal")}
            style={{ marginRight: 10 }}
          >
            <SymbolView
              name={{
                ios: "info.circle",
                android: "info",
                web: "info"
              }}
              size={28}
              tintColor={tint}
            />
          </Pressable>
        )
      }}
    >
      <Tabs.Protected guard={isAdmin}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Záznamy",
            tabBarIcon: AndroidTabIcon("list")
          }}
        />
        <Tabs.Screen
          name="input"
          options={{
            title: "Vstupní údaje",
            tabBarIcon: AndroidTabIcon("input")
          }}
        />
      </Tabs.Protected>
      <Tabs.Screen
        name="output"
        options={{
          title: "Výstupní údaje",
          tabBarIcon: AndroidTabIcon("output")
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
