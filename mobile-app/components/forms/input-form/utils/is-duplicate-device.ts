import type { Device } from "react-native-ble-plx";

const isDuplicateDevice = (devices: Device[], nextDevice: Device) => {
  return devices.findIndex((device) => nextDevice.id === device.id) > -1;
};

export { isDuplicateDevice };
