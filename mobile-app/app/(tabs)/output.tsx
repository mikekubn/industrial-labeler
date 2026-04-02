import { type BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";

import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useQuery } from "@tanstack/react-query";
import { CameraPermission } from "@/components/camera-permission";
import { UpdateQuantityForm } from "@/components/forms/update-quantity-form";
import { getQuantityService } from "@/services/quantity/service";

import { toast } from "sonner-native";

const OutputScreen = () => {
  const quantityService = getQuantityService();
  const [permission, requestPermission] = useCameraPermissions();
  const [openCamera, setOpenCamera] = useState(false);
  const [quantityId, setQuantityId] = useState<string | null>(null);

  const { data, refetch, isFetching } = useQuery({
    enabled: !!quantityId,
    queryKey: ["quantity", quantityId],
    queryFn: () => {
      if (quantityId) {
        return quantityService.getQuantityById({ id: quantityId });
      }

      return null;
    }
  });

  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (result.data) {
        setQuantityId(result.data);
        toast.success("Načítám váhu...");
        refetch();
      }
      setOpenCamera(false);
    },
    [refetch]
  );

  const handleRequestPermission = useCallback(async () => {
    const response = await requestPermission();

    if (response.granted) {
      setOpenCamera(true);
    }
  }, [requestPermission]);

  if (!permission || !permission.granted) {
    return <CameraPermission onRequestPermission={handleRequestPermission} />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={20}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      >
        {openCamera ? (
          <View style={styles.scannerRoot}>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </View>
        ) : (
          <View style={styles.scannerRoot} />
        )}

        <View style={styles.contentContainer}>
          <UpdateQuantityForm quantity={data || null} />

          <View style={styles.buttonsContainer}>
            {openCamera ? (
              <Pressable
                accessibilityRole="button"
                style={styles.cancelButton}
                disabled={isFetching}
                onPress={() => setOpenCamera(false)}
              >
                <Text style={styles.cancelButtonText}>{isFetching ? "Načítám..." : "Zrušit"}</Text>
              </Pressable>
            ) : (
              <Pressable
                accessibilityRole="button"
                style={styles.scanButton}
                disabled={isFetching}
                onPress={() => setOpenCamera(true)}
              >
                <Text style={styles.scanButtonText}>{isFetching ? "Načítám..." : "Skenovat QR kód"}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white"
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    alignItems: "center"
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 16
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  scannerRoot: {
    width: 400,
    height: 400,
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#D2D6D2",
    marginBottom: 16
  },
  scanButton: {
    width: 260,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#2563eb"
  },
  scanButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  },
  cancelButton: {
    width: 260,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#c62828"
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center"
  },
  saveButton: {
    width: 260,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#176917"
  }
});

export default OutputScreen;
