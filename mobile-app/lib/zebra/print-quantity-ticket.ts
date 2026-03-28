import type { PrintQuantityTicketBleContext, QuantityTicketZplParams } from "./type";

import { buildQuantityTicketZpl } from "./build-quantity-ticket-zpl";
import { printZplViaBle } from "./print-zpl-via-ble";

/**
 * Sends ZPL directly to the printer over BLE (no PrintConnect app from Zebra organization).
 */
const printQuantityTicket = async (params: QuantityTicketZplParams, ble: PrintQuantityTicketBleContext) => {
  const zpl = buildQuantityTicketZpl(params);
  const result = await printZplViaBle(ble.bleManager, ble.printerDeviceId, zpl);

  if (!result.ok) {
    return { success: false, message: result.message };
  }

  return { success: true, message: "Záznam byl úspěšně vytištěn" };
};

export { printQuantityTicket };
