import type { CreateRecordFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getMaterialService } from "@/services/material/service";

const SelectMaterial = () => {
  const materialService = getMaterialService();
  const form = useFormContext<CreateRecordFormSchema>();
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  const { data } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => await materialService.getAllMaterials()
  });

  return (
    <Controller
      name="materialId"
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
        <>
          <View style={[styles.pickerWrap, { borderColor }]}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="— Vyberte položku —" value="" />
              {data?.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          {fieldError?.message ? <Text style={styles.fieldError}>{fieldError.message}</Text> : null}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden"
  },
  fieldError: {
    color: "#c62828",
    fontSize: 13,
    marginTop: 4
  }
});

export { SelectMaterial };
