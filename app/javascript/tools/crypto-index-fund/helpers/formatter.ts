const currency = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  if (Number.isNaN(value) || typeof value === "undefined") {
    return formatter.format(0);
  }

  return formatter.format(value);
};

export default {
  currency,
};
