import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text, useThemeColor } from "@/components/Themed";
import usePrinterStore from "@/stores/printer-store";

import { getBleManager } from "../lib/ble-manager";

import { toast } from "sonner-native";

const bleManager = getBleManager();

const ZebraPrinterStatusAndActions = () => {
  const connectedPrinter = usePrinterStore((store) => store.connectedPrinter);
  const setConnectedPrinter = usePrinterStore((store) => store.setConnectedPrinter);
  const setIsPrinterModalOpen = usePrinterStore((store) => store.setIsPrinterModalOpen);

  const textColor = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");
  const muted = useThemeColor({}, "tabIconDefault");
  const isConnected = connectedPrinter !== null;

  const disconnectPrinter = async () => {
    const id = connectedPrinter?.id;
    setConnectedPrinter(null);

    if (!id) {
      return;
    }

    try {
      await bleManager.cancelDeviceConnection(id);
      toast.success("Tiskárna byla úspěšně odpojena");
    } catch {
      toast.error("Chyba při odpojení tiskárny");
    }
  };

  const connectedPrinterLabel = useMemo(() => {
    if (!connectedPrinter) {
      return "Not connected";
    }

    return connectedPrinter.name ?? connectedPrinter.localName ?? connectedPrinter.id;
  }, [connectedPrinter]);

  return (
    <View style={styles.printerRow}>
      <View style={styles.printerStatus}>
        <Text style={styles.printerTitle}>Tiskárna</Text>
        <Text style={[styles.printerSubtitle, { color: textColor }]}>{connectedPrinterLabel}</Text>
      </View>
      <View style={styles.printerButtons}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: isConnected }}
          disabled={isConnected}
          onPress={() => setIsPrinterModalOpen(true)}
          style={({ pressed }) => [styles.actionPressable, pressed && !isConnected && styles.actionPressablePressed]}
        >
          <Text style={{ color: isConnected ? muted : tint, fontWeight: "800" }}>Připojit</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !isConnected }}
          disabled={!isConnected}
          onPress={disconnectPrinter}
          style={({ pressed }) => [styles.actionPressable, pressed && isConnected && styles.actionPressablePressed]}
        >
          <Text style={{ color: isConnected ? "#c62828" : muted, fontWeight: "800" }}>Odpojit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  printerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  printerStatus: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1
  },
  printerButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  actionPressable: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  actionPressablePressed: {
    opacity: 0.55
  },
  printerTitle: {
    fontSize: 18,
    fontWeight: "700"
  },
  printerSubtitle: {
    fontSize: 14,
    opacity: 0.8
  }
});

export { ZebraPrinterStatusAndActions };
