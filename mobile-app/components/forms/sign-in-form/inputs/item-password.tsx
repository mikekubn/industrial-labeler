import type { SignInFormSchema } from "../schema";

import { SymbolView } from "expo-symbols";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, useThemeColor, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

const PasswordInput = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const form = useFormContext<SignInFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const textColor = useThemeColor({}, "text");
  const iconTint = colorScheme === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)";

  return (
    <Controller
      name="password"
      control={form.control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <>
          <View style={[styles.inputWrap, { borderColor }]}>
            <TextInput
              placeholder="Heslo"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              style={[styles.input, { color: textColor }]}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={secureTextEntry ? "Zobrazit heslo" : "Skrýt heslo"}
              hitSlop={8}
              onPress={() => setSecureTextEntry((prev) => !prev)}
              style={styles.toggle}
            >
              <SymbolView
                name={{
                  ios: secureTextEntry ? "eye" : "eye.slash",
                  android: secureTextEntry ? "visibility" : "visibility_off",
                  web: secureTextEntry ? "visibility" : "visibility_off"
                }}
                size={22}
                tintColor={iconTint}
              />
            </Pressable>
          </View>
          {fieldState.invalid && <Text style={styles.fieldError}>{fieldState.error?.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48
  },
  toggle: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  fieldError: {
    color: "#c62828",
    fontSize: 13,
    marginTop: 4
  }
});

export { PasswordInput };
