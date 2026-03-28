import type { CreateRecordFormSchema } from "./schema";

import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, useThemeColor } from "@/components/Themed";
import { getRecordService } from "@/services/record/service";

import { toast } from "sonner-native";
import { SelectItem } from "./inputs/select-item";
import { SelectMaterial } from "./inputs/select-material";
import { useCreateRecordFormValidation } from "./validation";

const CreateRecordForm = () => {
  const recordService = getRecordService();
  const queryClient = useQueryClient();
  const backgroundColor = useThemeColor({}, "background");
  const validation = useCreateRecordFormValidation();
  const methods = useForm<CreateRecordFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      itemId: "",
      materialId: ""
    }
  });

  const { handleSubmit } = methods;

  const createRecordMutation = useMutation({
    mutationFn: async ({ materialId, itemId }: CreateRecordFormSchema) =>
      await recordService.createRecord({
        materialId,
        itemId
      }),
    onSuccess: () => {
      toast.success("Záznam byl úspěšně vytvořen");
      queryClient.invalidateQueries({ queryKey: ["records"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření záznamu");
    }
  });

  const onSubmit = (value: CreateRecordFormSchema) => {
    createRecordMutation.mutate(value);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Vytvořit záznam</Text>
      <FormProvider {...methods}>
        <SelectItem />
        <SelectMaterial />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={createRecordMutation.isPending}
        >
          <Text style={styles.buttonText}>{createRecordMutation.isPending ? "Ukládám..." : "Vytvořit záznam"}</Text>
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

export { CreateRecordForm };
