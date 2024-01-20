import { useEffect, useState } from "react";
import { Currency, WeightingStrategy, Weights } from "./types";

const round = (value: number) => Math.round(value * 100) / 100;

const computeByEquality = (currencies: Currency[]): Weights => {
  const weights: Weights = {};

  let remainingWeight = 100;

  currencies.forEach((currency) => {
    const weight = Math.floor(100 / currencies.length);

    weights[currency.symbol] = round(weight / 100);

    remainingWeight -= weight;
  });

  currencies.forEach((currency) => {
    if (remainingWeight > 0) {
      weights[currency.symbol] += 0.01;
      remainingWeight -= 1;
    }
  });

  return weights;
};

const computeByMarketCap = (currencies: Currency[]): Weights => {
  const weights: Weights = {};

  const totalMarketCap = currencies.reduce(
    (total, currency) => total + currency.marketCap,
    0
  );

  if (totalMarketCap === 0) {
    currencies.forEach((currency) => {
      weights[currency.symbol] = 0;
    });

    return weights;
  }

  let remainingWeight = 100;

  currencies
    .slice()
    .reverse()
    .forEach((currency, index) => {
      const weight = Math.round((100 * currency.marketCap) / totalMarketCap);

      if (index === currencies.length - 1) {
        weights[currency.symbol] = round(remainingWeight / 100);
      } else {
        weights[currency.symbol] = round(weight / 100);
      }

      remainingWeight -= weight;
    });

  return weights;
};

const computeByCustom = (currencies: Currency[]): Weights => {
  const weights: Weights = {};

  currencies.forEach((currency) => {
    weights[currency.symbol] = 0;
  });

  return weights;
};

const computeWeights = (
  weightsStrategy: WeightingStrategy,
  currencies: Currency[]
): Weights => {
  switch (weightsStrategy) {
    case "equally-weighted":
      return computeByEquality(currencies);
    case "market-cap-weighted":
      return computeByMarketCap(currencies);
    case "custom":
      return computeByCustom(currencies);
  }
};

const scaleWeights = (weights: Weights, availableWeight: number) => {
  const newWeights: Weights = {};

  Object.keys(weights).forEach((symbol) => {
    newWeights[symbol] = round(weights[symbol] * availableWeight);
  });

  return newWeights;
};

const sumWeights = (currentWeights: Weights, additionalWeights: Weights) => {
  const weights: Weights = {};

  Object.keys(currentWeights).forEach((symbol) => {
    weights[symbol] = round(currentWeights[symbol] + additionalWeights[symbol]);
  });

  return weights;
};

const normalizeWeights = (weights: Weights) => {
  const availableWeight = getAvailableWeight(weights);

  if (availableWeight === 0) {
    return weights;
  }

  const sortedSymbols = Object.entries(weights)
    .sort(([symbolA, weightA], [symbolB, weightB]) => weightB - weightA)
    .map(([symbol]) => symbol);

  const newWeights: Weights = {
    ...weights,
  };

  sortedSymbols.forEach((symbol) => {
    const availableWeight = getAvailableWeight(newWeights);

    if (availableWeight === 0) {
      return;
    }

    if (availableWeight < 0) {
      newWeights[symbol] = round(newWeights[symbol] - 0.01);
    }

    if (availableWeight > 0) {
      newWeights[symbol] = round(newWeights[symbol] + 0.01);
    }
  });

  return newWeights;
};

const getAllocatedWeight = (weights: Weights) =>
  round(Object.values(weights).reduce((acc, curr) => acc + curr, 0));

const getAvailableWeight = (weights: Weights) =>
  round(1 - getAllocatedWeight(weights));

const getDistributeRemainingWeightStrategy = (
  weightsStrategy: WeightingStrategy
): WeightingStrategy => {
  if (weightsStrategy === "custom") {
    return "equally-weighted";
  }

  return weightsStrategy;
};

export type WeightsHook = {
  weights: Weights;
  weightAllocated: number;
  isFullyAllocated: boolean;
  changeWeight: (symbol: string, weight: number) => void;
  distributeRemainingWeight: () => void;
};

type UseWeightsHook = (
  weightsStrategy: WeightingStrategy,
  currencies: Currency[]
) => WeightsHook;

const useWeights: UseWeightsHook = (
  weightsStrategy: WeightingStrategy,
  currencies: Currency[]
) => {
  const [weights, setWeights] = useState(
    computeWeights(weightsStrategy, currencies)
  );

  const changeWeight = (symbol: string, weight: number) => {
    setWeights((oldWeights) => ({
      ...oldWeights,
      [symbol]: weight,
    }));
  };

  const distributeRemainingWeight = () => {
    const strategy = getDistributeRemainingWeightStrategy(weightsStrategy);
    const newWeights = computeWeights(strategy, currencies);
    const scaledWeights = scaleWeights(newWeights, getAvailableWeight(weights));
    const summedWeights = sumWeights(weights, scaledWeights);
    const normalizedWeights = normalizeWeights(summedWeights);

    setWeights(normalizedWeights);
  };

  useEffect(() => {
    const newWeights = computeWeights(weightsStrategy, currencies);

    setWeights(newWeights);
  }, [weightsStrategy, JSON.stringify(currencies)]);

  const isFullyAllocated = getAllocatedWeight(weights) === 1;

  return {
    weights,
    changeWeight,
    weightAllocated: getAllocatedWeight(weights),
    isFullyAllocated,
    distributeRemainingWeight,
  };
};

export default useWeights;
