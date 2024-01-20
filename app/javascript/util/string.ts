export const commaJoin = (
  array: string[],
  lastWord = "and",
  useOxfordComma = true
): string => {
  const listStart = array.slice(0, -1).join(", ");
  const listEnd = array.slice(-1);
  const conjunction =
    array.length <= 1
      ? ""
      : useOxfordComma && array.length > 2
      ? `, ${lastWord} `
      : ` ${lastWord} `;

  return [listStart, listEnd].join(conjunction);
};
