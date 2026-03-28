const sanitizeWeightValue = (raw: string): number => {
  return Number.parseFloat(raw.trim().replace(",", "."));
};

export { sanitizeWeightValue };
