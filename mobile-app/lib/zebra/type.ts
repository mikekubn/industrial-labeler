import type { BleManager } from "react-native-ble-plx";

export type QuantityTicketZplParams = {
  materialName: string;
  itemName: string;
  weight: number;
  recordId: string;
  quantityId: string;
};

export type PrintQuantityTicketBleContext = {
  bleManager: BleManager;
  /** `Device.id` from react-native-ble-plx (MAC on Android). */
  printerDeviceId: string;
};

export type WriteTarget = {
  serviceUUID: string;
  characteristicUUID: string;
  writeMode: "withResponse" | "withoutResponse";
};
