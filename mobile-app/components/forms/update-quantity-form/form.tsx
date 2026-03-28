import type { QuantityResponseSchema, QuantityUpdateRequestSchemaPayload } from "@/services/quantity/schemes/quantity";
import type { UpdateQuantityFormSchema } from "./schema";

import { useEffect, useEffectEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Text, View } from "@/components/Themed";
import { getQuantityService } from "@/services/quantity/service";

import { sanitizeWeightValue } from "../input-form/utils";

import { toast } from "sonner-native";
import { InputNumber } from "./inputs/input-number";
import { IsMarkedCheckbox } from "./inputs/is-marked";
import { OutputNumber } from "./inputs/output-number";
import { useUpdateQuantityFormValidation } from "./validation";

const UpdateQuantityForm = ({ quantity }: { quantity: QuantityResponseSchema | null }) => {
  const quantityService = getQuantityService();
  const validation = useUpdateQuantityFormValidation();

  const methods = useForm<UpdateQuantityFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      isMarked: false,
      output: "0",
      input: "0"
    }
  });

  const onLoadQuantity = useEffectEvent(() => {
    if (quantity) {
      methods.reset({
        isMarked: quantity.isMarked,
        output: quantity.output.toString(),
        input: quantity.input.toString()
      });
    }
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async (payload: QuantityUpdateRequestSchemaPayload) =>
      await quantityService.updateQuantity({
        id: payload.id,
        data: payload.data
      }),
    onSuccess: () => {
      toast.success("Váha byla úspěšně aktualizována");
      methods.reset({
        isMarked: false,
        output: "0",
        input: "0"
      });
    },
    onError: () => {
      toast.error("Chyba při aktualizaci váhy");
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (value: UpdateQuantityFormSchema) => {
    const input = sanitizeWeightValue(value.input);
    const output = sanitizeWeightValue(value.output);

    if (!quantity) {
      return;
    }

    updateQuantityMutation.mutate({
      id: quantity.id,
      data: {
        output,
        input,
        isMarked: value.isMarked
      }
    });
  };

  useEffect(() => {
    if (quantity) {
      onLoadQuantity();
    }
  }, [quantity]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktualizovat váhu</Text>
      <FormProvider {...methods}>
        <View style={styles.quantity}>
          <Text style={styles.label}>Vstupní váha (Kg):</Text>
          <InputNumber />
        </View>
        <View style={styles.quantity}>
          <Text style={styles.label}>Výstupní váha (Kg):</Text>
          <OutputNumber editable={quantity?.output === 0} />
          <IsMarkedCheckbox />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            accessibilityRole="button"
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={updateQuantityMutation.isPending}
          >
            <Text style={styles.buttonText}>
              {updateQuantityMutation.isPending ? "Ukládám..." : "Aktualizovat váhu"}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.clearButton}
            onPress={() => {
              methods.reset({
                isMarked: false,
                output: "0",
                input: "0"
              });
            }}
            disabled={updateQuantityMutation.isPending}
          >
            <Text style={styles.buttonText}>Zrušit</Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 20
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#176917"
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  },
  quantity: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8
  },
  label: {
    fontSize: 16,
    fontWeight: "600"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  clearButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#c62828"
  }
});

export { UpdateQuantityForm };
