import type { QuantityTicketZplParams } from "./type";

import { escapeZplField } from "./utils/escape-zpl-field";
import { formatWeightLine } from "./utils/format-weight-line";

/**
 * Physical label size — must match printer “Aktuální média” / print info (e.g. 4.0 × 5.97 in).
 * If this differs from the stock, ^LL/^PW disagree with the firmware and you get wrong feeds, blank labels, or bad QR placement.
 */
const LABEL_WIDTH_IN = 4;
const LABEL_HEIGHT_IN = 5.97;

/**
 * Must match the printer’s resolution (203 vs 300 dpi). Wrong DPI mis-sizes ^PW/^LL and all ^FO positions.
 * Your device reports “délka etikety v bodech” 1211 for 5.97" → 203 dpi (1211 / 5.97 ≈ 203).
 */
const DPI = 203;

/**
 * Layout coordinates were tuned for ~4" × 6" portrait stock at 203 dpi; scale when DPI differs.
 */
const DPI_TEMPLATE = 203;

const LABEL_WIDTH_DOTS = Math.round(LABEL_WIDTH_IN * DPI);
/** Match firmware “label length in dots” (5.97" × 203 → 1211 on Zebra print info). */
const LABEL_HEIGHT_DOTS = Math.floor(LABEL_HEIGHT_IN * DPI);

const scaleDots = (templateDots: number) => Math.round((templateDots * DPI) / DPI_TEMPLATE);

/** Text layout (template at 203 dpi, scaled). */
const TEXT_X = scaleDots(80);
const Y_ITEM = scaleDots(80);
const Y_MATERIAL = scaleDots(160);
const Y_INPUT = scaleDots(240);
const Y_RECORD = scaleDots(320);

/** Space reserved below the record line before the QR region (clears ^A0N,24,24). */
const RECORD_LINE_TAIL = scaleDots(56);
/** Bottom margin inside the label. */
const BOTTOM_MARGIN = scaleDots(40);

const QR_MAG = 8;

/**
 * Max payload bytes per QR version (byte mode, ECC L — slightly smaller symbol than M/H, so we pad below).
 * If capacity is exceeded we use version 40 (177×177 modules).
 */
const QR_BYTE_CAP_ECC_L = [
  17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 702, 752, 844, 898, 958, 1048,
  1096, 1184, 1276, 1370, 1468, 1531, 1631, 1735, 1843, 1955, 2071, 2191, 2313, 2439, 2569, 2701, 2843
] as const;

const qrModulesForPayloadByteLength = (byteLength: number) => {
  const idx = QR_BYTE_CAP_ECC_L.findIndex((cap) => byteLength <= cap);
  const version = idx === -1 ? 40 : idx + 1;
  return 21 + 4 * (version - 1);
};

/**
 * Approximate QR symbol width/height in dots (Zebra uses magnification as module size; add padding for ECC/quiet zone).
 */
const qrSymbolDots = (payloadUtf8Bytes: number) => {
  const modules = qrModulesForPayloadByteLength(payloadUtf8Bytes);
  const base = modules * QR_MAG;
  return Math.ceil(base * 1.08);
};

/**
 * `^FO` is top-left of the QR field; center using estimated printed size (depends on `quantityId` length).
 */
const qrOrigin = (quantityIdUtf8ByteLength: number) => {
  const sym = qrSymbolDots(quantityIdUtf8ByteLength);
  const textBottom = Y_RECORD + RECORD_LINE_TAIL;
  const regionTop = textBottom;
  const regionBottom = LABEL_HEIGHT_DOTS - BOTTOM_MARGIN;
  const regionMidY = regionTop + (regionBottom - regionTop) / 2;
  const qrY = Math.floor(regionMidY - sym / 2);
  const qrX = Math.floor((LABEL_WIDTH_DOTS - sym) / 2);
  return { qrX: Math.max(0, qrX), qrY: Math.max(0, qrY), sym };
};

/**
 * ZPL for Zebra printers (e.g. ZD421) via PrintConnect passthrough.
 */
const buildQuantityTicketZpl = ({ materialName, itemName, weight, recordId, quantityId }: QuantityTicketZplParams) => {
  const m = escapeZplField(materialName);
  const i = escapeZplField(itemName);
  const w = escapeZplField(formatWeightLine(weight));
  const idRecord = escapeZplField(recordId);
  const qrPayload = escapeZplField(quantityId);
  /** QR encodes `quantityId` bytes (ZPL `^^` is only escaping for the printer, not extra QR content). */
  const payloadBytes = new TextEncoder().encode(quantityId).length;
  const { qrX, qrY } = qrOrigin(payloadBytes);

  return `^XA
^LH0,0
^LS0
^PW${LABEL_WIDTH_DOTS}
^LL${LABEL_HEIGHT_DOTS}
^CI28

^FXfield for the element 'item'
^FO${TEXT_X},${Y_ITEM}
^FWN
^A0N,32,32^FDPolozka: ${i}^FS

^FXfield for the element 'material'
^FO${TEXT_X},${Y_MATERIAL}
^FWN
^A0N,32,32^FDMaterial: ${m}^FS

^FXfield for the element 'input'
^FO${TEXT_X},${Y_INPUT}
^FWN
^A0N,32,32^FDVstup Vaha: ${w}^FS

^FXfield for the element 'recordId'
^FO${TEXT_X},${Y_RECORD}
^FWN
^A0N,24,24^FDId zaznamu: ${idRecord}^FS

^FXfield for the element 'QR' (replaces barcode)
^FO${qrX},${qrY}
^FWN
^BQN,2,${QR_MAG}^FDQA,${qrPayload}^FS

^XZ`;
};

export { buildQuantityTicketZpl };
