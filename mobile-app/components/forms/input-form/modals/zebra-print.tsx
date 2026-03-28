import type { BleError, Device } from "react-native-ble-plx";

import { useCallback, useState } from "react";
import { ActivityIndicator, Button, FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, useThemeColor } from "@/components/Themed";
import { useBluetoothLowEnergyPermissions } from "@/hooks/useBluetoothLowEnergyPermissions";
import usePrinterStore from "@/stores/printer-store";

import { getBleManager } from "../lib/ble-manager";
import { isDuplicateDevice } from "../utils/is-duplicate-device";
import { isLikelyZebra } from "../utils/is-likely-zebra-device";

import { toast } from "sonner-native";

const bleManager = getBleManager();

const ZebraPrintModal = () => {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const isScanning = usePrinterStore((store) => store.isScanning);
  const isPrinterModalOpen = usePrinterStore((store) => store.isPrinterModalOpen);
  const setIsScanning = usePrinterStore((store) => store.setIsScanning);
  const setConnectedPrinter = usePrinterStore((store) => store.setConnectedPrinter);
  const setIsPrinterModalOpen = usePrinterStore((store) => store.setIsPrinterModalOpen);

  const backgroundColor = useThemeColor({}, "background");
  const { requestBlePermissions } = useBluetoothLowEnergyPermissions();

  const stopScan = useCallback(async () => {
    try {
      await bleManager.stopDeviceScan();
      setIsScanning(false);
    } catch (error) {
      console.error(error);
      toast.error("Chyba při zastavení skenování tiskáren");
    }
  }, [setIsScanning]);

  const scanForPrinters = async () => {
    const granted = await requestBlePermissions();

    if (!granted) {
      toast.error("Bluetooth oprávnění nebyly udělena");
      return;
    }

    setAllDevices([]);
    setIsScanning(true);

    bleManager.startDeviceScan(null, null, (error: BleError | null, device: Device | null) => {
      if (error) {
        stopScan();
        toast.error(error.message ?? "Chyba při skenování tiskáren");
        return;
      }

      if (!device) {
        return;
      }

      if (!isLikelyZebra(device)) {
        return;
      }

      setAllDevices((prev) => {
        if (isDuplicateDevice(prev, device)) {
          return prev;
        }

        return [...prev, device];
      });
    });
  };

  const connectToPrinter = async (device: Device) => {
    try {
      const connection = await bleManager.connectToDevice(device.id);
      setConnectedPrinter(connection);
      await connection.discoverAllServicesAndCharacteristics();
      stopScan();
      toast.success(`Připojena tiskárna: ${connection.name ?? connection.localName ?? connection.id}`);
      setIsPrinterModalOpen(false);
    } catch {
      toast.error("Chyba při připojení k tiskárně");
    }
  };

  return (
    <Modal
      visible={isPrinterModalOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsPrinterModalOpen(false)}
    >
      <SafeAreaView style={[styles.modalContainer, { backgroundColor }]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Připojit Zebra tiskárnu</Text>
          <Button title="Zavřít" onPress={() => setIsPrinterModalOpen(false)} />
        </View>

        <View style={styles.modalActions}>
          <Button title={isScanning ? "Skenuji..." : "Skenovat"} onPress={scanForPrinters} disabled={isScanning} />
          <Button title="Stop" onPress={stopScan} disabled={!isScanning} color="red" />
        </View>

        {isScanning && (
          <View style={styles.scanRow}>
            <ActivityIndicator />
            <Text style={styles.scanText}>Hledám zařízení…</Text>
          </View>
        )}

        <FlatList
          data={allDevices}
          keyExtractor={(d) => d.id}
          contentContainerStyle={styles.deviceList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>{isScanning ? "Zatím nic…" : "Zatím žádná zařízení. Zkus skenovat."}</Text>
          }
          renderItem={({ item }) => {
            const label = item.name ?? item.localName ?? item.id;
            return (
              <Pressable style={styles.deviceRow} onPress={() => connectToPrinter(item)}>
                <View style={styles.deviceText}>
                  <Text style={styles.deviceName}>{label}</Text>
                  <Text style={styles.deviceId}>{item.id}</Text>
                </View>
                <Text style={styles.deviceAction}>Připojit</Text>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 16,
    gap: 14
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800"
  },
  modalActions: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  scanRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  scanText: {
    fontSize: 14,
    opacity: 0.85
  },
  deviceList: {
    marginTop: 20,
    gap: 10,
    paddingBottom: 24
  },
  emptyText: {
    opacity: 0.75
  },
  deviceRow: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(127,127,127,0.35)",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  deviceText: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "700"
  },
  deviceId: {
    fontSize: 12,
    opacity: 0.7
  },
  deviceAction: {
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.9
  }
});

export { ZebraPrintModal };
