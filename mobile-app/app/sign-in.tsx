import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import { SignInForm } from "@/components/forms/sign-in-form";

export default function SignIn() {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView
        bottomOffset={10}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator
      >
        <SignInForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24
  },
  button: {
    marginTop: 26,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#2563eb"
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center"
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16
  },
  error: {
    color: "#c00",
    fontSize: 14,
    textAlign: "center"
  },
  spinner: { marginVertical: 8 }
});
