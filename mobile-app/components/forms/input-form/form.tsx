import type { QuantityCreateRequestSchema } from "@/services/quantity/schemes/quantity";
import type { InputFormSchema, WeightInputFormSchema } from "./schema";

import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Text, useThemeColor } from "@/components/Themed";
import { printQuantityTicket } from "@/lib/zebra/print-quantity-ticket";
import { getQuantityService } from "@/services/quantity/service";
import { getRecordService } from "@/services/record/service";
import usePrinterStore from "@/stores/printer-store";

import { toast } from "sonner-native";
import { RecordInfo } from "./components/record-info";
import { ZebraPrinterStatusAndActions } from "./components/zebra-printer";
import { SelectItem } from "./inputs/select-item";
import { WeightInput } from "./inputs/weight-input";
import { getBleManager } from "./lib/ble-manager";
import { ZebraPrintModal } from "./modals/zebra-print";
import { sanitizeWeightValue } from "./utils";
import { useInputFormValidation, useWeightInputFormValidation } from "./validation";

const bleManager = getBleManager();

const InputRecordForm = () => {
  const [isSubmittingWeight, setIsSubmittingWeight] = useState(false);
  const isPrinterModalOpen = usePrinterStore((store) => store.isPrinterModalOpen);
  const setIsScanning = usePrinterStore((store) => store.setIsScanning);
  const connectedPrinter = usePrinterStore((store) => store.connectedPrinter);

  const recordService = getRecordService();
  const quantityService = getQuantityService();
  const backgroundColor = useThemeColor({}, "background");

  const validation = useInputFormValidation();
  const weightValidation = useWeightInputFormValidation();

  const onStopScan = useEffectEvent(() => {
    stopScan();
  });

  const methods = useForm<InputFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      itemId: ""
    }
  });

  const weightMethods = useForm<WeightInputFormSchema>({
    resolver: zodResolver(weightValidation),
    defaultValues: {
      weight: ""
    }
  });

  const { handleSubmit: handleSubmitWeight } = weightMethods;
  const { handleSubmit } = methods;

  const itemId = useWatch<InputFormSchema>({
    control: methods.control,
    name: "itemId"
  });

  const { data, refetch, isFetching } = useQuery({
    enabled: !!itemId,
    queryKey: ["records", itemId],
    queryFn: async () =>
      await recordService.getRecordByItemId({
        itemId
      })
  });

  const { mutateAsync: createQuantity } = useMutation({
    mutationFn: async ({ recordId, input }: QuantityCreateRequestSchema) =>
      await quantityService.createQuantity({
        recordId,
        input
      }),
    onSuccess: async (quantity) => {
      if (quantity) {
        toast.success(`Váha s id ${quantity.id} a váhou ${quantity.input} byla úspěšně uložena`);

        if (!data || !connectedPrinter) {
          toast.error("Záznam nebyl nalezen nebo tiskárna nebyla připojena");
          return;
        }

        await printQuantityTicket(
          {
            materialName: data.material.name,
            itemName: data.item.name,
            recordId: data.id,
            weight: quantity.input,
            quantityId: quantity.id
          },
          { bleManager, printerDeviceId: connectedPrinter.id }
        );

        weightMethods.reset();
        setIsSubmittingWeight(false);
      }
    },
    onError: () => {
      toast.error("Chyba při ukládání váhy");
      setIsSubmittingWeight(false);
    }
  });

  const onSubmit = () => {
    refetch();
  };

  const stopScan = useCallback(async () => {
    try {
      await bleManager.stopDeviceScan();
      setIsScanning(false);
    } catch (error) {
      console.error(error);
      toast.error("Chyba při zastavení skenování tiskáren");
    }
  }, [setIsScanning]);

  const onSubmitWeight = async (value: WeightInputFormSchema) => {
    if (!data?.id) {
      toast.error("Záznam nebyl nalezen");
      return;
    }

    if (!connectedPrinter) {
      toast.error("Nejprve připojte tiskárnu přes modální okno (Bluetooth).");
      return;
    }

    setIsSubmittingWeight(true);
    const input = sanitizeWeightValue(value.weight);

    await createQuantity({
      recordId: data.id,
      input
    });
  };

  useEffect(() => {
    if (!isPrinterModalOpen) {
      onStopScan();
    }
  }, [isPrinterModalOpen]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ZebraPrinterStatusAndActions />
      <Text style={styles.title}>Načíst záznam</Text>
      <FormProvider {...methods}>
        <SelectItem />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>{isFetching ? "Načítám..." : "Načíst záznam"}</Text>
        </Pressable>
      </FormProvider>
      {data && <RecordInfo data={data} />}

      <Text style={styles.title}>Zadat váhu</Text>
      <FormProvider {...weightMethods}>
        <WeightInput />
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmitWeight(onSubmitWeight)}
          disabled={isSubmittingWeight}
        >
          <Text style={styles.buttonText}>{isSubmittingWeight ? "Probíhá..." : "Tisk QR & Uložit váhu"}</Text>
        </Pressable>
      </FormProvider>
      <ZebraPrintModal />
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

export { InputRecordForm };
