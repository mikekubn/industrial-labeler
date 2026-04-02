import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Platform, Pressable, StyleSheet, Text } from "react-native";

import { View } from "@/components/Themed";
import { BUILD_INFO } from "@/constants/app-version";
import { authClient } from "@/lib/auth-client";

const ModalScreen = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Verze aplikace:</Text>
          <Text style={styles.text}>{BUILD_INFO}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>E-mail:</Text>
          <Text style={styles.text}>{session?.user?.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.replace("/sign-in");
                }
              }
            })
          }
        >
          <Text style={styles.buttonText}>Odhlásit se</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 40,
    gap: 20
  },
  contentContainer: {
    alignItems: "flex-start",
    gap: 20
  },
  buttonContainer: {
    alignItems: "flex-end",
    gap: 10
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});

export default ModalScreen;
