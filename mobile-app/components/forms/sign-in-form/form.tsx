import type { SignInFormSchema } from "./schema";

import { useRouter } from "expo-router";

import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Text } from "@/components/Themed";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner-native";
import { EmailInput } from "./inputs/item-email";
import { PasswordInput } from "./inputs/item-password";
import { useSignInFormValidation } from "./validation";

const SignInForm = () => {
  const router = useRouter();
  const { refetch: refetchSession } = authClient.useSession();
  const validation = useSignInFormValidation();
  const methods = useForm<SignInFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: SignInFormSchema) => await authClient.signIn.email({ email, password }),
    onSuccess: async () => {
      toast.success("Uživatel byl úspěšně přihlášen");
      methods.reset();
      await refetchSession();
      router.replace("/(tabs)");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Network error";
      toast.error(message);
    }
  });

  const onSubmit = (value: SignInFormSchema) => {
    signInMutation.mutate(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Vytvořit položku</Text>
      <FormProvider {...methods}>
        <EmailInput />
        <PasswordInput />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={signInMutation.isPending}
        >
          <Text style={styles.buttonText}>{signInMutation.isPending ? "Přihlašuji..." : "Přihlásit se"}</Text>
        </Pressable>
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  button: {
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
  }
});

export { SignInForm };
