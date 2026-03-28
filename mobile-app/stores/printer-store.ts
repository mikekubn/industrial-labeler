import type { Device } from "react-native-ble-plx";

import { create } from "zustand";

interface PrinterStore {
  isPrinterModalOpen: boolean;
  isScanning: boolean;
  connectedPrinter: Device | null;
  setIsPrinterModalOpen: (isPrinterModalOpen: boolean) => void;
  setIsScanning: (isScanning: boolean) => void;
  setConnectedPrinter: (connectedPrinter: Device | null) => void;
}

const usePrinterStore = create<PrinterStore>((set) => ({
  isPrinterModalOpen: false,
  isScanning: false,
  connectedPrinter: null,
  setIsPrinterModalOpen: (isPrinterModalOpen: boolean) => set({ isPrinterModalOpen }),
  setIsScanning: (isScanning: boolean) => set({ isScanning }),
  setConnectedPrinter: (connectedPrinter: Device | null) => set({ connectedPrinter })
}));

export default usePrinterStore;
