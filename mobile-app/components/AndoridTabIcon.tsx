import { SymbolView } from "expo-symbols";

import { Platform } from "react-native";

const AndroidTabIcon =
  (icon: "list" | "input" | "output") =>
  ({ color }: { color: string }) =>
    Platform.OS === "android" ? <SymbolView name={{ android: icon }} tintColor={color} size={28} /> : null;

export { AndroidTabIcon };
