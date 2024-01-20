import { renderHook } from "@testing-library/react-hooks";

import useChart, { pricesToReturns, returnsToValues } from "./useChart";
import { Currency, Period, Weights } from "./types";

describe("useChart", () => {
  // test("pricesToReturns", () => {
  //   const prices = [1, 2, 3, 1.5, 0.75];
  //   const returns = [0, 1, 0.5, -0.5, -0.5];

  //   expect(pricesToReturns(prices)).toEqual(returns);
  // });

  // test("returnsToValues", () => {
  //   const returns = [0, 1, 0.5, -0.5, -0.5];
  //   const amountInvested = 100;
  //   const values = [100, 200, 300, 150, 75];

  //   expect(returnsToValues(returns, amountInvested)).toEqual(values);
  // });

  // test("returns chart data", () => {
  //   const amountInvested = 100;
  //   const currencies: Currency[] = [
  //     {
  //       symbol: "BTC",
  //       prices: [0.75, 1.5, 3, 2, 1],
  //       color: "",
  //       logo: "",
  //       name: "",
  //       marketCap: 0,
  //     },
  //   ];
  //   const weights: Weights = {
  //     BTC: 1,
  //   };
  //   const period: Period = "all-time";

  //   const hook = renderHook(() =>
  //     useChart(amountInvested, currencies, weights, period)
  //   );

  //   const data = [
  //     [1, 100],
  //     [2, 200],
  //     [3, 300],
  //     [4, 150],
  //     [5, 75],
  //   ];

  //   expect(hook.result.current).toEqual(data);
  // });

  test("compute data for currencies with different prices size", () => {
    const amountInvested = 200;
    const currencies: Currency[] = [
      {
        symbol: "BTC",
        prices: [2, 2, 2, 1],
        color: "",
        logo: "",
        name: "",
        marketCap: 0,
      },
      {
        symbol: "ETH",
        prices: [2, 2, 1],
        color: "",
        logo: "",
        name: "",
        marketCap: 0,
      },
    ];
    const weights: Weights = {
      BTC: 0.5,
      ETH: 0.5,
    };
    const period: Period = "all-time";

    const hook = renderHook(() =>
      useChart(amountInvested, currencies, weights, period)
    );

    const data = [
      [1, 100],
      [2, 300],
      [3, 400],
      [4, 400],
    ];

    expect(hook.result.current).toEqual(data);
  });
});
