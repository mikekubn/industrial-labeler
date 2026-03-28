import * as ExpoDevice from "expo-device";

import { PermissionsAndroid, Platform } from "react-native";

const useBluetoothLowEnergyPermissions = () => {
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
      title: "Bluetooth permission",
      message: "Bluetooth is required to find a printer",
      buttonPositive: "OK"
    });

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Bluetooth permission",
        message: "Bluetooth is required to connect to a printer",
        buttonPositive: "OK"
      }
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission",
        message: "Bluetooth scanning may require Location permission",
        buttonPositive: "OK"
      }
    );

    return (
      bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
      bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
      fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const requestBlePermissions = async () => {
    if (Platform.OS !== "android") return true;

    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location permission",
        message: "Bluetooth scanning may require Location permission",
        buttonPositive: "OK"
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return await requestAndroid31Permissions();
  };

  return {
    requestBlePermissions
  };
};

export { useBluetoothLowEnergyPermissions };
