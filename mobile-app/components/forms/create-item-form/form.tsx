import type { CreateItemFormSchema } from "./schema";

import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, useThemeColor } from "@/components/Themed";
import { getItemService } from "@/services/item/service";

import { toast } from "sonner-native";
import { ItemNameInput } from "./inputs/item-name-input";
import { useCreateItemFormValidation } from "./validation";

const CreateItemForm = () => {
  const itemService = getItemService();
  const queryClient = useQueryClient();
  const backgroundColor = useThemeColor({}, "background");
  const validation = useCreateItemFormValidation();
  const methods = useForm<CreateItemFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      name: ""
    }
  });

  const { handleSubmit } = methods;

  const createItemMutation = useMutation({
    mutationFn: async ({ name }: CreateItemFormSchema) =>
      await itemService.createItem({
        name
      }),
    onSuccess: () => {
      toast.success("Položka byla úspěšně vytvořena");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření položky");
    }
  });

  const onSubmit = (value: CreateItemFormSchema) => {
    createItemMutation.mutate(value);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Vytvořit položku</Text>
      <FormProvider {...methods}>
        <ItemNameInput />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={createItemMutation.isPending}
        >
          <Text style={styles.buttonText}>{createItemMutation.isPending ? "Ukládám..." : "Vytvořit položku"}</Text>
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

export { CreateItemForm };
