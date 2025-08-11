export const toDecimalString = (value: number): string => {
  if (!Number.isFinite(value)) return "0.00";
  return value.toFixed(2);
};

export const decimalLikeToNumber = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};
