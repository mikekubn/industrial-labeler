import type { Device } from "react-native-ble-plx";

const isLikelyZebra = (device: Device) => {
  const name = (device.name ?? device.localName ?? "").trim();
  if (!name) return false;

  const n = name.toLowerCase();
  const looksLikeCodeName = /^[A-Z0-9]{5,}$/.test(name);

  return (
    n.includes("zebra") ||
    n.startsWith("zd") ||
    n.startsWith("zt") ||
    n.startsWith("qln") ||
    n.startsWith("tc") ||
    n.startsWith("rw") ||
    looksLikeCodeName
  );
};

export { isLikelyZebra };
