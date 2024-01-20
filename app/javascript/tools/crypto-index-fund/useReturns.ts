import { useMemo } from "react";

import { periodToDays } from "./helpers";
import { Currency, Period, Weights, Returns } from "./types";

type UseReturnsHook = (
  period: Period,
  weights: Weights,
  currencies: Currency[],
  amountInvested: number
) => Returns;

const useReturns: UseReturnsHook = (
  period,
  weights,
  currencies,
  amountInvested
) => {
  const getCurrentPrice = (currency: Currency) => {
    return currency.prices[0];
  };

  const getFirstPriceInPeriod = (currency: Currency, period: Period) => {
    const days = periodToDays(period);
    const prices = currency.prices.slice(0, days);

    return prices[days - 1] || prices.slice(-1)[0];
  };

  const currencyReturnByPeriod = (currency: Currency, period: Period) => {
    const currentPrice = getCurrentPrice(currency);
    const firstPrice = getFirstPriceInPeriod(currency, period);

    if (firstPrice === 0) {
      return 0;
    }

    return currentPrice / firstPrice;
  };

  const totalInvested = () => {
    return Object.values(weights).reduce((total, weight) => {
      return total + amountInvested * weight;
    }, 0);
  };

  const computeReturn = () => {
    if (Object.keys(weights).length === 0) return 0;

    const total = currencies.reduce((total, currency) => {
      const weight = weights[currency.symbol];
      const returnByPeriod = currencyReturnByPeriod(currency, period);
      const returnAmount = returnByPeriod * amountInvested * weight;

      return total + returnAmount;
    }, 0);

    if (total === 0) return 0;

    const moneyInvested = totalInvested();
    const moneyNotInvested = amountInvested - moneyInvested;

    const currentAmountMoney = total + moneyNotInvested;

    return (currentAmountMoney - amountInvested) / amountInvested;
  };

  const returns = useMemo(() => {
    const computedReturn = computeReturn();

    // If returns is less than 0.01%
    if (Math.abs(computedReturn) < 0.001) return 0;

    return computedReturn;
  }, [period, weights, currencies, amountInvested]);

  return {
    returnPercentage: returns,
    returnMoney: returns * amountInvested,
    startMoney: amountInvested,
    endMoney: amountInvested * (1 + returns),
    isPositive: returns > 0,
    isNegative: returns < 0,
    isNeutral: returns === 0,
  };
};

export default useReturns;
