import type { SignInFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

import { Text, useThemeColor, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

const EmailInput = () => {
  const form = useFormContext<SignInFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const textColor = useThemeColor({}, "text");

  return (
    <Controller
      name="email"
      control={form.control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <>
          <View style={[styles.inputWrap, { borderColor }]}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              keyboardType="email-address"
              placeholder="E-mail"
              value={value}
              onChangeText={onChange}
              style={[styles.input, { color: textColor }]}
            />
          </View>
          {fieldState.invalid && <Text style={styles.fieldError}>{fieldState.error?.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden"
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48
  },
  fieldError: {
    color: "#c62828",
    fontSize: 13,
    marginTop: 4
  }
});

export { EmailInput };
