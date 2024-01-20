import type { Currency, Period, Weights, Row } from "./types";
import { periodToDays } from "./helpers";

type UseTableHook = (
  amountInvested: number,
  currencies: Currency[],
  weights: Weights,
  changeWeight: (symbol: string, weight: number) => void,
  period: Period
) => Row[];

const useTable: UseTableHook = (
  amountInvested,
  currencies,
  weights,
  changeWeight,
  period
) => {
  const days = periodToDays(period);

  const availableWeight = Math.max(
    Object.values(weights).reduce((max, weight) => {
      return max - weight;
    }, 1),
    0
  );

  const rows: Row[] = currencies.map((currency) => {
    const valueInvested = amountInvested * weights[currency.symbol];
    const currencyAmount = valueInvested / currency.prices[0];

    return {
      currency,
      weight: weights[currency.symbol],
      changeWeight: (weight: number) => changeWeight(currency.symbol, weight),
      maxWeight: weights[currency.symbol] + availableWeight,
      amountInvested: valueInvested,
      currencyAmount: currencyAmount,
    };
  });

  return rows;
};

export default useTable;
