import { useRouter } from "expo-router";

import { useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    Keyboard.dismiss();
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password
      });
      if (result.error) {
        setErrorMessage(result.error.message ?? "Přihlášení se nezdařilo. Zkuste to znovu.");
        return;
      }
      router.replace("/(tabs)");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Network error";
      setErrorMessage(
        __DEV__
          ? `${message} (zkontrolujte, že backend běží a že telefon je ve stejné síti)`
          : "Nelze se spojit se serverem. Zkuste to znovu."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView
        bottomOffset={10}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator
      >
        <Text style={styles.title}>Přihlášení</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!submitting}
          keyboardType="email-address"
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          editable={!submitting}
          placeholder="Heslo"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {submitting ? (
          <ActivityIndicator style={styles.spinner} />
        ) : (
          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Přihlásit se</Text>
          </Pressable>
        )}
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
