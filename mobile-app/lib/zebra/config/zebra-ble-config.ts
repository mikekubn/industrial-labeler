/**
 * Zebra BLE UUIDs (bluetooth low energy)
 * Configuration for bluetooth communication
 */

/**
 * Zebra Link-OS BLE “Zebra Bluetooth” service
 */
const ZEBRA_BTLE_SERVICE_UUID = "38EB4A80-C570-11E3-9507-0002A5D5C51B";
/**
 *  Host → printer data (“write to printer”).
 */
const ZEBRA_WRITE_TO_PRINTER_CHAR_UUID = "38EB4A82-C570-11E3-9507-0002A5D5C51B";
/**
 * Printer → host data.
 */
const ZEBRA_READ_FROM_PRINTER_CHAR_UUID = "38EB4A81-C570-11E3-9507-0002A5D5C51B";

/**
 * Nordic UART–style fallback (some peripherals expose a serial bridge over BLE).
 */
const NUS_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const NUS_RX_CHAR_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

export {
  NUS_RX_CHAR_UUID,
  NUS_SERVICE_UUID,
  ZEBRA_BTLE_SERVICE_UUID,
  ZEBRA_READ_FROM_PRINTER_CHAR_UUID,
  ZEBRA_WRITE_TO_PRINTER_CHAR_UUID
};
