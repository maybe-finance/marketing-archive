import { renderHook } from "@testing-library/react-hooks";

import { Currency, Weights } from "../../types";
import useDistribution from "./useDistribution";

const currencyFactory = (symbol: string, marketCap: number): Currency => ({
  symbol,
  marketCap,
  color: "",
  logo: "",
  name: "",
  prices: [],
});

describe("useDistribution", () => {
  it("returns top currencies based on weight and market price", () => {
    const weights: Weights = {
      AAA: 3,
      BBB: 3,
      CCC: 2,
      DDD: 4,
    };
    const currencies: Currency[] = [
      currencyFactory("AAA", 1),
      currencyFactory("BBB", 2),
      currencyFactory("CCC", 3),
      currencyFactory("DDD", 4),
    ];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.topCurrencies.map((c) => c.symbol)).toEqual([
      "DDD",
      "BBB",
      "AAA",
      "CCC",
    ]);
  });

  it("returns weight allocated by other currencies", () => {
    const weights: Weights = {
      AAA: 0.1,
      BBB: 0.1,
      CCC: 0.1,
      DDD: 0.1,
      EEE: 0.1,
      FFF: 0.1,
      GGG: 0.1,
    };
    const currencies: Currency[] = [
      currencyFactory("AAA", 7),
      currencyFactory("BBB", 6),
      currencyFactory("CCC", 5),
      currencyFactory("DDD", 4),
      currencyFactory("EEE", 3),
      currencyFactory("FFF", 2),
      currencyFactory("GGG", 1),
    ];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.other).toEqual(0.2);
    expect(hook.result.current.unallocated).toEqual(0.3);
  });

  it("show other if total currencies > top currencies", () => {
    const weights: Weights = {
      AAA: 1,
      BBB: 1,
      CCC: 1,
      DDD: 1,
      EEE: 1,
      FFF: 1,
      GGG: 1,
    };
    const currencies: Currency[] = [
      currencyFactory("AAA", 1),
      currencyFactory("BBB", 1),
      currencyFactory("CCC", 1),
      currencyFactory("DDD", 1),
      currencyFactory("EEE", 1),
      currencyFactory("FFF", 1),
      currencyFactory("GGG", 1),
    ];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.showOther).toEqual(true);
  });

  it("hide other if total currencies <= top currencies", () => {
    const weights: Weights = {
      AAA: 1,
      BBB: 1,
      CCC: 1,
      DDD: 1,
      EEE: 1,
    };
    const currencies: Currency[] = [
      currencyFactory("AAA", 1),
      currencyFactory("BBB", 1),
      currencyFactory("CCC", 1),
      currencyFactory("DDD", 1),
      currencyFactory("EEE", 1),
    ];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.showOther).toEqual(false);
  });

  it("show unallocated if unallocated > 0", () => {
    const weights: Weights = {
      AAA: 0.5,
    };
    const currencies: Currency[] = [currencyFactory("AAA", 1)];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.showUnallocated).toEqual(true);
  });

  it("hide unallocated if unallocated = 0", () => {
    const weights: Weights = {
      AAA: 1,
    };
    const currencies: Currency[] = [currencyFactory("AAA", 1)];

    const hook = renderHook(() => useDistribution(weights, currencies));

    expect(hook.result.current.showUnallocated).toEqual(false);
  });
});
