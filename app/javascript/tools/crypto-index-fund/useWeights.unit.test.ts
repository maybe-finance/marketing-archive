import { renderHook, act } from "@testing-library/react-hooks";
import { Currency } from "./types";
import useWeights from "./useWeights";

describe("useWeights", () => {
  describe("computeByEquality", () => {
    test("all weights should be equal", () => {
      const hook = renderHook(() =>
        useWeights("equally-weighted", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weights.BTC).toBe(0.5);
      expect(hook.result.current.weights.ETH).toBe(0.5);
    });
  });

  describe("computeByMarketCap", () => {
    test("weights should be proportial to market cap", () => {
      const currencies: Partial<Currency>[] = [
        { symbol: "BTC", marketCap: 70 },
        { symbol: "ETH", marketCap: 30 },
      ];

      const hook = renderHook(() =>
        useWeights("market-cap-weighted", currencies)
      );

      expect(hook.result.current.weights.BTC).toBe(0.7);
      expect(hook.result.current.weights.ETH).toBe(0.3);
    });

    test("weights should be multiple of step", () => {
      const currencies: Partial<Currency>[] = [
        { symbol: "BTC", marketCap: 1 },
        { symbol: "ETH", marketCap: 1 },
        { symbol: "SOL", marketCap: 1 },
      ];

      const hook = renderHook(() =>
        useWeights("market-cap-weighted", currencies)
      );

      expect(hook.result.current.weights.BTC).toBe(0.34);
      expect(hook.result.current.weights.ETH).toBe(0.33);
      expect(hook.result.current.weights.SOL).toBe(0.33);
    });

    test("weights should not exceed 1", () => {
      const currencies = [
        {
          symbol: "BTC",
          marketCap: 800121335412,
        },
        {
          symbol: "ETH",
          marketCap: 379412292712,
        },
        {
          symbol: "BNB",
          marketCap: 69858260760,
        },
        {
          symbol: "SOL",
          marketCap: 36687824384,
        },
        {
          symbol: "LUNA",
          marketCap: 34660598323,
        },
        {
          symbol: "ADA",
          marketCap: 32871292735,
        },
        {
          symbol: "AVAX",
          marketCap: 21654499436,
        },
      ];

      const hook = renderHook(() =>
        useWeights("market-cap-weighted", currencies)
      );

      const totalWeight = Object.values(hook.result.current.weights).reduce(
        (acc, curr) => acc + curr,
        0
      );

      expect(totalWeight).toBe(1);
    });
  });

  describe("computeByCustom", () => {
    test("weights should be zero", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weights.BTC).toBe(0);
      expect(hook.result.current.weights.ETH).toBe(0);
    });
  });

  describe("changeWeight", () => {
    test("manually change weight", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weights).toEqual({
        BTC: 0,
        ETH: 0,
      });

      act(() => {
        hook.result.current.changeWeight("BTC", 0.5);
      });

      expect(hook.result.current.weights).toEqual({
        BTC: 0.5,
        ETH: 0,
      });
    });
  });

  describe("isFullyAllocated", () => {
    test("is false if it is not fully allocated", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weights).toEqual({
        BTC: 0,
        ETH: 0,
      });

      act(() => {
        hook.result.current.changeWeight("BTC", 0.5);
      });

      expect(hook.result.current.isFullyAllocated).toEqual(false);
    });

    test("is true if it is fully allocated", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weights).toEqual({
        BTC: 0,
        ETH: 0,
      });

      act(() => {
        hook.result.current.changeWeight("BTC", 1);
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
    });

    test("is true when using equally-weighted strategy", () => {
      const hook = renderHook(() =>
        useWeights("equally-weighted", [
          { symbol: "BTC" },
          { symbol: "ETH" },
          { symbol: "SOL" },
        ])
      );

      expect(hook.result.current.isFullyAllocated).toEqual(true);
    });

    test("is true when using market-cap-weighted strategy", () => {
      const hook = renderHook(() =>
        useWeights("market-cap-weighted", [
          { symbol: "BTC", marketCap: 1 },
          { symbol: "ETH", marketCap: 1 },
          { symbol: "SOL", marketCap: 1 },
        ])
      );

      expect(hook.result.current.isFullyAllocated).toEqual(true);
    });

    test("is false when using custom strategy", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.isFullyAllocated).toEqual(false);
    });
  });

  describe("weightAllocated", () => {
    test("return total weight allocated", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      expect(hook.result.current.weightAllocated).toEqual(0);

      act(() => {
        hook.result.current.changeWeight("BTC", 0.5);
        hook.result.current.changeWeight("ETH", 0.1);
      });

      expect(hook.result.current.weightAllocated).toEqual(0.6);
    });
  });

  describe("distributeRemainingWeight", () => {
    test("distribute equally when using equally-weighted strategy", () => {
      const hook = renderHook(() =>
        useWeights("equally-weighted", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      act(() => {
        hook.result.current.changeWeight("BTC", 0.5);
        hook.result.current.changeWeight("ETH", 0.1);
      });

      act(() => {
        hook.result.current.distributeRemainingWeight();
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
      expect(hook.result.current.weights).toEqual({
        BTC: 0.7,
        ETH: 0.3,
      });
    });

    test("distribute equally when using custom strategy", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      act(() => {
        hook.result.current.changeWeight("BTC", 0.2);
        hook.result.current.changeWeight("ETH", 0.4);
      });

      act(() => {
        hook.result.current.distributeRemainingWeight();
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
      expect(hook.result.current.weights).toEqual({
        BTC: 0.4,
        ETH: 0.6,
      });
    });

    test("distribute using market-cap when using market-cap-weighted strategy", () => {
      const hook = renderHook(() =>
        useWeights("market-cap-weighted", [
          { symbol: "BTC", marketCap: 2 },
          { symbol: "ETH", marketCap: 1 },
        ])
      );

      act(() => {
        hook.result.current.changeWeight("BTC", 0.2);
        hook.result.current.changeWeight("ETH", 0.2);
      });

      act(() => {
        hook.result.current.distributeRemainingWeight();
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
      expect(hook.result.current.weights).toEqual({
        BTC: 0.6,
        ETH: 0.4,
      });
    });

    test("bug: round issues does not result 100% after rebalance", () => {
      const hook = renderHook(() =>
        useWeights("custom", [{ symbol: "BTC" }, { symbol: "ETH" }])
      );

      act(() => {
        hook.result.current.changeWeight("BTC", 0.99);
      });

      act(() => {
        hook.result.current.distributeRemainingWeight();
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
      expect(hook.result.current.weights).toEqual({
        BTC: 0.99,
        ETH: 0.01,
      });
    });

    test("bug: round issues does not result 100% after rebalance", () => {
      const hook = renderHook(() =>
        useWeights("custom", [
          { symbol: "BTC" },
          { symbol: "ETH" },
          { symbol: "SOL" },
        ])
      );

      act(() => {
        hook.result.current.changeWeight("BTC", 0.98);
        hook.result.current.changeWeight("ETH", 0.01);
      });

      act(() => {
        hook.result.current.distributeRemainingWeight();
      });

      expect(hook.result.current.isFullyAllocated).toEqual(true);
      expect(hook.result.current.weights).toEqual({
        BTC: 0.99,
        ETH: 0.01,
        SOL: 0.0,
      });
    });
  });
});
