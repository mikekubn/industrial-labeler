import type { CreateMaterialFormSchema } from "./schema";

import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, useThemeColor } from "@/components/Themed";
import { getMaterialService } from "@/services/material/service";

import { toast } from "sonner-native";
import { MaterialNameInput } from "./inputs/material-name-input";
import { useCreateMaterialFormValidation } from "./validation";

const CreateMaterialForm = () => {
  const materialService = getMaterialService();
  const queryClient = useQueryClient();
  const backgroundColor = useThemeColor({}, "background");
  const validation = useCreateMaterialFormValidation();
  const methods = useForm<CreateMaterialFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      name: ""
    }
  });

  const { handleSubmit } = methods;

  const createMaterialMutation = useMutation({
    mutationFn: async ({ name }: CreateMaterialFormSchema) =>
      await materialService.createMaterial({
        name
      }),
    onSuccess: () => {
      toast.success("Materiál byl úspěšně vytvořen");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření materiálu");
    }
  });

  const onSubmit = (value: CreateMaterialFormSchema) => {
    createMaterialMutation.mutate(value);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Vytvořit materiál</Text>
      <FormProvider {...methods}>
        <MaterialNameInput />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={createMaterialMutation.isPending}
        >
          <Text style={styles.buttonText}>{createMaterialMutation.isPending ? "Ukládám..." : "Vytvořit materiál"}</Text>
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

export { CreateMaterialForm };
