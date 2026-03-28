/**
 * Format weight line for Zebra printers (e.g. ZD421).
 */
const formatWeightLine = (weight: number) => {
  return `${weight.toLocaleString("cs-CZ", { maximumFractionDigits: 4, minimumFractionDigits: 0 })} kg`;
};

export { formatWeightLine };
