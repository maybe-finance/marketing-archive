import { useMemo } from "react";

import { Weights, Currency } from "../../types";

export type Distribution = {
  topCurrencies: Currency[];
  other: number;
  unallocated: number;
  showOther: boolean;
  showUnallocated: boolean;
};

type UseDistribution = (
  weights: Weights,
  currencies: Currency[]
) => Distribution;

const getTopCurrencies = (
  weights: Weights,
  currencies: Currency[]
): Currency[] => {
  const sortedCurrencies = currencies.slice().sort((a, b) => {
    const aWeight = weights[a.symbol];
    const bWeight = weights[b.symbol];

    if (aWeight === bWeight) {
      return b.marketCap - a.marketCap;
    }

    return bWeight - aWeight;
  });

  return sortedCurrencies.slice(0, 5);
};

const round = (value: number) => Math.round(value * 100) / 100;

const getWeightAllocated = (
  weights: Weights,
  currencies: Currency[]
): number => {
  const weight = currencies.reduce((acc, currency) => {
    return acc + weights[currency.symbol];
  }, 0);

  return round(weight);
};

const useDistribution: UseDistribution = (weights, currencies) => {
  return useMemo(() => {
    const topCurrencies = getTopCurrencies(weights, currencies);
    const weightAllocatedByTopCurrencies = getWeightAllocated(
      weights,
      topCurrencies
    );
    const totalWeightAllocated = getWeightAllocated(weights, currencies);
    const weightAllocatedByOtherCurrencies = round(
      totalWeightAllocated - weightAllocatedByTopCurrencies
    );
    const weightUnallocated =
      1 - weightAllocatedByTopCurrencies - weightAllocatedByOtherCurrencies;

    return {
      topCurrencies,
      other: weightAllocatedByOtherCurrencies,
      unallocated: weightUnallocated,
      showOther: topCurrencies.length < currencies.length,
      showUnallocated: weightUnallocated >= 0.001,
    };
  }, [JSON.stringify(weights)]);
};

export default useDistribution;
