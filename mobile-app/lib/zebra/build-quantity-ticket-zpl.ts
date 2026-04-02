import type { QuantityTicketZplParams } from "./type";

import { escapeZplField } from "./utils/escape-zpl-field";

/**
 * ZPL for Zebra printers (e.g. ZD421) via PrintConnect passthrough.
 */
const buildQuantityTicketZpl = ({ materialName, itemName, weight, recordId, quantityId }: QuantityTicketZplParams) => {
  const m = escapeZplField(materialName);
  const i = escapeZplField(itemName);
  const w = escapeZplField(weight.toString());
  const d = escapeZplField(new Date().toLocaleDateString("cs-CZ"));
  const idRecord = escapeZplField(recordId).replaceAll("-", " ");
  const idQuantity = escapeZplField(quantityId).replaceAll("-", " ");
  const qrPayload = escapeZplField(quantityId);

  return `^XA
^FX --- Title ---
^CF0,60
^FO180,60^FDLabeler^FS
^CF0,60
^FO340,60^FDApp^FS

^FX --- Version badge ---
^CF0,30
^FO180,120^FDLabel - v1.0^FS

^FX --- Separator line ---
^FO100,200^GB612,3,3^FS

^FX --- Items info ---
^CF0,32
^FO100,240^FDPolozka:^FS
^CF0,32
^FO240,240^FD${i}^FS

^FX --- Material info ---
^CF0,32
^FO100,290^FDMaterial:^FS
^CF0,32
^FO240,290^FD${m}^FS

^FX --- Input info ---
^CF0,32
^FO100,340^FDVstupni vaha:^FS
^CF0,32
^FO300,340^FD${w} kg^FS

^FX --- Print info ---
^CF0,32
^FO100,390^FDDatum tisku:^FS
^CF0,32
^FO300,390^FD${d}^FS

^FX --- Record info ---
^CF0,32
^FO100,440^FDID zaznamu:^FS
^CF0,32
^FO100,480^FB612,3,0,L^FD${idRecord}^FS

^FX --- Separator ---
^FO100,580^GB612,1,1^FS

^FX --- QR code ---
^FO100,640^BQN,2,8^FDMA,${qrPayload}^FS

^FX --- URL under QR ---
^CF0,32
^FO100,990^FDID vahy:^FS
^CF0,32
^FO100,1030^FB612,3,0,L^FD${idQuantity}^FS
^XZ`;
};

export { buildQuantityTicketZpl };
