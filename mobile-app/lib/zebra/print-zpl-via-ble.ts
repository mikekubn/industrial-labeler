import type { BleManager, Device } from "react-native-ble-plx";
import type { WriteTarget } from "./type";

import {
  NUS_RX_CHAR_UUID,
  NUS_SERVICE_UUID,
  ZEBRA_BTLE_SERVICE_UUID,
  ZEBRA_READ_FROM_PRINTER_CHAR_UUID,
  ZEBRA_WRITE_TO_PRINTER_CHAR_UUID
} from "./config/zebra-ble-config";
import { normalizeUuid } from "./utils/normalize-uuid";

/**
 * BLE ATT payload limit (often 20–512 depending on MTU). Splitting mid-^command corrupts ZPL (garbled print,
 * blank extra label). We chunk on line breaks first; only split raw bytes if a single line exceeds the limit.
 */
const ZPL_CHUNK_BYTES = 240;

const uint8ToBase64 = (bytes: Uint8Array) => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }

  return globalThis.btoa(binary);
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const ensureConnectedDevice = async (bleManager: BleManager, deviceId: string) => {
  if (await bleManager.isDeviceConnected(deviceId)) {
    const known = await bleManager.devices([deviceId]);
    const d = known[0];
    if (d) {
      await d.discoverAllServicesAndCharacteristics();
      return d;
    }
  }

  const d = await bleManager.connectToDevice(deviceId);
  await d.discoverAllServicesAndCharacteristics();
  return d;
};

const pickWritableOnService = async (device: Device, serviceUUID: string): Promise<WriteTarget | null> => {
  const chars = await device.characteristicsForService(serviceUUID);
  const nRead = normalizeUuid(ZEBRA_READ_FROM_PRINTER_CHAR_UUID);

  for (const c of chars) {
    if (!c.isWritableWithResponse && !c.isWritableWithoutResponse) continue;
    if (normalizeUuid(c.uuid) === nRead) continue;

    if (c.isWritableWithoutResponse) {
      return { serviceUUID, characteristicUUID: c.uuid, writeMode: "withoutResponse" };
    }
    if (c.isWritableWithResponse) {
      return { serviceUUID, characteristicUUID: c.uuid, writeMode: "withResponse" };
    }
  }

  return null;
};

const resolveWriteTarget = async (device: Device): Promise<WriteTarget | null> => {
  const services = await device.services();

  const tryOrder: Array<{ service: string; characteristic: string }> = [
    { service: ZEBRA_BTLE_SERVICE_UUID, characteristic: ZEBRA_WRITE_TO_PRINTER_CHAR_UUID },
    { service: NUS_SERVICE_UUID, characteristic: NUS_RX_CHAR_UUID }
  ];

  for (const { service, characteristic } of tryOrder) {
    const svc = services.find((s) => normalizeUuid(s.uuid) === normalizeUuid(service));
    if (!svc) continue;

    const chars = await device.characteristicsForService(svc.uuid);
    const match = chars.find((c) => normalizeUuid(c.uuid) === normalizeUuid(characteristic));
    if (!match) continue;

    if (match.isWritableWithoutResponse) {
      return { serviceUUID: svc.uuid, characteristicUUID: match.uuid, writeMode: "withoutResponse" };
    }
    if (match.isWritableWithResponse) {
      return { serviceUUID: svc.uuid, characteristicUUID: match.uuid, writeMode: "withResponse" };
    }
  }

  const zebraSvc = services.find((s) => normalizeUuid(s.uuid) === normalizeUuid(ZEBRA_BTLE_SERVICE_UUID));
  if (zebraSvc) {
    const picked = await pickWritableOnService(device, zebraSvc.uuid);
    if (picked) return picked;
  }

  for (const svc of services) {
    const picked = await pickWritableOnService(device, svc.uuid);
    if (picked) return picked;
  }

  return null;
};

const pushByteSlices = (chunks: Uint8Array[], bytes: Uint8Array) => {
  for (let offset = 0; offset < bytes.length; offset += ZPL_CHUNK_BYTES) {
    chunks.push(bytes.subarray(offset, offset + ZPL_CHUNK_BYTES));
  }
};

/** Prefer newline boundaries so ZPL commands are never split across BLE writes. */
const encodeZplToChunks = (zpl: string): Uint8Array[] => {
  const encoder = new TextEncoder();
  const lines = zpl.split("\n");
  const chunks: Uint8Array[] = [];
  let buffer = "";

  for (const line of lines) {
    const segment = buffer.length === 0 ? line : `${buffer}\n${line}`;
    const segLen = encoder.encode(segment).length;

    if (segLen <= ZPL_CHUNK_BYTES) {
      buffer = segment;
      continue;
    }

    if (buffer.length > 0) {
      chunks.push(encoder.encode(buffer));
      buffer = "";
    }

    const lineBytes = encoder.encode(line);
    if (lineBytes.length > ZPL_CHUNK_BYTES) {
      pushByteSlices(chunks, lineBytes);
    } else {
      buffer = line;
    }
  }

  if (buffer.length > 0) {
    chunks.push(encoder.encode(buffer));
  }

  return chunks;
};

const writeZplChunks = async (
  bleManager: BleManager,
  deviceId: string,
  target: WriteTarget,
  zpl: string
): Promise<void> => {
  const chunkBuffers = encodeZplToChunks(zpl);

  for (let c = 0; c < chunkBuffers.length; c++) {
    const chunk = chunkBuffers[c]!;
    const b64 = uint8ToBase64(chunk);

    if (target.writeMode === "withoutResponse") {
      await bleManager.writeCharacteristicWithoutResponseForDevice(
        deviceId,
        target.serviceUUID,
        target.characteristicUUID,
        b64
      );
    } else {
      await bleManager.writeCharacteristicWithResponseForDevice(
        deviceId,
        target.serviceUUID,
        target.characteristicUUID,
        b64
      );
    }

    if (chunkBuffers.length > 1) {
      await sleep(12);
    }
  }
};

/**
 * Sends raw ZPL to a connected Zebra (or compatible) printer over BLE.
 * Requires an active dev build with `react-native-ble-plx` and a printer that exposes the Zebra BLE service.
 */
const printZplViaBle = async (bleManager: BleManager, printerDeviceId: string, zpl: string) => {
  try {
    const device = await ensureConnectedDevice(bleManager, printerDeviceId);
    const target = await resolveWriteTarget(device);

    if (!target) {
      return {
        ok: false,
        message: "Tiskárna nemá zapisovatelný BLE znak pro ZPL (nepodařilo se najít znak pro ZPL)."
      };
    }

    await writeZplChunks(bleManager, device.id, target, zpl);
    return { ok: true, message: "Záznam byl úspěšně vytištěn" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg || "Chyba při tisku" };
  }
};

export { printZplViaBle };
