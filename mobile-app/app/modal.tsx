import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Button, Platform, StyleSheet, Text } from "react-native";

import { View } from "@/components/Themed";
import { authClient } from "@/lib/auth-client";

const ModalScreen = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Text style={styles.text}>{session?.user?.email}</Text>
      <Button
        title="Odhlásit se"
        color="red"
        onPress={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.replace("/sign-in");
              }
            }
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 20
  }
});

export default ModalScreen;
