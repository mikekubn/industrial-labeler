import type { CreateItemFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

import { Text, useThemeColor, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

const ItemNameInput = () => {
  const form = useFormContext<CreateItemFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const textColor = useThemeColor({}, "text");
  const placeholderColor = colorScheme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
        <>
          <View style={[styles.inputWrap, { borderColor }]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Název položky"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { color: textColor }]}
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>
          {fieldError?.message ? <Text style={styles.fieldError}>{fieldError.message}</Text> : null}
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

export { ItemNameInput };
