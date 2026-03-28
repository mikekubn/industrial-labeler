import { NativeModules, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

let bleManagerInstance: BleManager | null = null;

const isBlePlxNativeAvailable = (): boolean => Platform.OS !== "web" && NativeModules.BlePlx != null;

const getBleManager = (): BleManager => {
  if (!isBlePlxNativeAvailable()) {
    throw new Error(
      "BLE není v tomto prostředí k dispozici — použijte vývojovou build aplikace s react-native-ble-plx (ne Expo Go ani web)."
    );
  }

  if (!bleManagerInstance) {
    bleManagerInstance = new BleManager();
  }

  return bleManagerInstance;
};

export { getBleManager, isBlePlxNativeAvailable };
