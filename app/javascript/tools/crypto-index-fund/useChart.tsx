import { useMemo } from "react";

import { Currency, Period, Weights, ChartData } from "./types";
import { periodToDays } from "./helpers";

export const pricesToReturns = (prices: number[]): number[] => {
  const returns = [0];

  for (let i = 1; i < prices.length; i++) {
    returns.push(prices[i] / prices[i - 1] - 1);
  }

  return returns;
};

export const returnsToValues = (
  returns: number[],
  amountInvested: number
): number[] => {
  const values = [amountInvested];

  for (let i = 1; i < returns.length; i++) {
    values.push(values[i - 1] * (1 + returns[i]));
  }

  return values;
};

const computeChartData = (
  amountInvested: number,
  currencies: Currency[],
  weights: Weights,
  period: Period
): ChartData => {
  if (currencies.length === 0) return [];

  const days = periodToDays(period);
  const values: { [key: string]: number[] } = {};
  const data: ChartData = [];

  currencies.forEach((currency) => {
    const prices = currency.prices.slice(0, days).reverse();
    const returns = pricesToReturns(prices);
    values[currency.symbol] = returnsToValues(
      returns,
      amountInvested
    ).reverse();
  });

  const availableDays = Math.max(
    ...currencies
      .filter((currency) => weights[currency.symbol] > 0)
      .map((currencies) => currencies.prices.slice(0, days).length)
  );

  for (let i = 0; i < availableDays; i++) {
    const value = currencies.reduce((acc, currency) => {
      const currencyValue = values[currency.symbol][i] || 0;

      return acc + currencyValue * weights[currency.symbol];
    }, 0);

    data.push([availableDays - i, value]);
  }

  return data.reverse();
};

const useChart = (
  amountInvested: number,
  currencies: Currency[],
  weights: Weights,
  period: Period
): ChartData => {
  const data = useMemo(
    () => computeChartData(amountInvested, currencies, weights, period),
    [amountInvested, currencies, weights, period]
  );

  return data;
};

export default useChart;
