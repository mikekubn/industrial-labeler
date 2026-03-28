import type { UpdateQuantityFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { Text, useThemeColor } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

const IsMarkedCheckbox = () => {
  const form = useFormContext<UpdateQuantityFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const tint = useThemeColor({ light: "#176917", dark: "#4caf50" }, "tint");

  return (
    <Controller
      name="isMarked"
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
        <>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: value }}
            onPress={() => onChange(!value)}
            style={styles.row}
          >
            <View style={[styles.box, { borderColor }, value && { backgroundColor: tint, borderColor: tint }]}>
              {value ? (
                <Text lightColor="#fff" darkColor="#fff" style={styles.checkMark}>
                  ✓
                </Text>
              ) : null}
            </View>
            <Text style={styles.label}>Označit váhu</Text>
          </Pressable>
          {fieldError?.message ? <Text style={styles.fieldError}>{fieldError.message}</Text> : null}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 48
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  checkMark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1
  },
  fieldError: {
    color: "#c62828",
    fontSize: 13,
    marginTop: 4
  }
});

export { IsMarkedCheckbox };
