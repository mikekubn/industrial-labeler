import type { UpdateQuantityFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

import { Text, useThemeColor, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

const sanitizeWeightText = (raw: string) => {
  const filtered = raw.replace(/[^\d,.]/g, "");
  const sepIdx = filtered.search(/[,.]/);

  if (sepIdx === -1) {
    return filtered;
  }

  return filtered.slice(0, sepIdx + 1) + filtered.slice(sepIdx + 1).replace(/[,.]/g, "");
};

const InputNumber = () => {
  const form = useFormContext<UpdateQuantityFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const textColor = useThemeColor({}, "text");
  const placeholderColor = colorScheme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  return (
    <Controller
      name="input"
      control={form.control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
        <>
          <View style={[styles.inputWrap, { borderColor }]}>
            <TextInput
              value={value}
              onChangeText={(text) => onChange(sanitizeWeightText(text))}
              onBlur={onBlur}
              editable={false}
              placeholder="Vstupní váha"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { color: textColor }]}
              keyboardType="numeric"
              inputMode="decimal"
              autoCorrect={false}
              autoCapitalize="none"
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
    overflow: "hidden",
    width: "100%"
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
    backgroundColor: "#D2D6D2"
  },
  fieldError: {
    color: "#c62828",
    fontSize: 13,
    marginTop: 4
  }
});

export { InputNumber };
