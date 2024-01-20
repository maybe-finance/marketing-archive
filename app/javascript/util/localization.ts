export const DECIMAL_SEPARATOR: string =
  (1.1).toLocaleString().replace(/\d/g, "") || ".";

export const THOUSANDS_SEPARATOR: string =
  (1111).toLocaleString().replace(/\d/g, "") || ",";

export function parseNumber(value: string): number {
  let finalValue = value;
  if (THOUSANDS_SEPARATOR) {
    // Remove thousands separator from string
    finalValue = finalValue.replaceAll(THOUSANDS_SEPARATOR, "");
  }
  if (DECIMAL_SEPARATOR !== ".") {
    // Replace decimal separator with '.' for parsing
    finalValue = finalValue.replaceAll(DECIMAL_SEPARATOR, ".");
  }
  return parseFloat(finalValue);
}

export const formatNumber = (value: number, decimalPlaces = 2): string =>
  value.toLocaleString(undefined, { maximumFractionDigits: decimalPlaces });
