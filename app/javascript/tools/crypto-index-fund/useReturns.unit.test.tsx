import { renderHook } from "@testing-library/react-hooks";
import useReturns from "./useReturns";

const emptyCurrency = {
  color: "",
  logo: "",
  marketCap: 0,
  name: "",
};

describe("useReturns", () => {
  test("no price changes equal to zero returns", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 1,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [1],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 0,
      returnMoney: 0,
      startMoney: 100,
      endMoney: 100,
      isPositive: false,
      isNegative: false,
      isNeutral: true,
    });
  });

  test("100% returns when price double", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 1,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [2, 1],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 1,
      returnMoney: 100,
      startMoney: 100,
      endMoney: 200,
      isPositive: true,
      isNegative: false,
      isNeutral: false,
    });
  });

  test("50% loss when price dropped by half", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 1,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [1, 2],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: -0.5,
      returnMoney: -50,
      startMoney: 100,
      endMoney: 50,
      isPositive: false,
      isNegative: true,
      isNeutral: false,
    });
  });

  test("limited period", () => {
    const amountInvested = 100;
    const period = "7d";
    const weights = {
      BTC: 1,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [1, 1, 1, 1, 1, 1, 1, 2],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 0,
      returnMoney: 0,
      startMoney: 100,
      endMoney: 100,
      isPositive: false,
      isNegative: false,
      isNeutral: true,
    });
  });

  test("returns with many currencies", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 0.5,
      ETH: 0.5,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [1, 2],
        ...emptyCurrency,
      },
      {
        symbol: "ETH",
        prices: [1, 2],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: -0.5,
      returnMoney: -50,
      startMoney: 100,
      endMoney: 50,
      isPositive: false,
      isNegative: true,
      isNeutral: false,
    });
  });

  test("win and loss in different currencies", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 0.5,
      ETH: 0.5,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [2, 1],
        ...emptyCurrency,
      },
      {
        symbol: "ETH",
        prices: [1, 2],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 0.25,
      returnMoney: 25,
      startMoney: 100,
      endMoney: 125,
      isPositive: true,
      isNegative: false,
      isNeutral: false,
    });
  });

  test("price changes but without investiment result in zero returns", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 0,
      ETH: 0,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [2, 1],
        ...emptyCurrency,
      },
      {
        symbol: "ETH",
        prices: [1, 2],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 0,
      returnMoney: 0,
      startMoney: 100,
      endMoney: 100,
      isPositive: false,
      isNegative: false,
      isNeutral: true,
    });
  });

  test("Round returns inferior to 0.01% to zero", () => {
    const amountInvested = 100;
    const period = "all-time";
    const weights = {
      BTC: 1,
    };
    const currencies = [
      {
        symbol: "BTC",
        prices: [1, 1.001],
        ...emptyCurrency,
      },
    ];

    const hook = renderHook(() =>
      useReturns(period, weights, currencies, amountInvested)
    );

    expect(hook.result.current).toEqual({
      returnPercentage: 0,
      returnMoney: 0,
      startMoney: 100,
      endMoney: 100,
      isPositive: false,
      isNegative: false,
      isNeutral: true,
    });
  });
});
