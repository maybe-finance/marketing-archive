export const standardDeviation = (arr: number[]): number => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [] as number[])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - 1)
  );
};
