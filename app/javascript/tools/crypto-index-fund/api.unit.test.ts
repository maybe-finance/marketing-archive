import axios from "axios";

import api from "./api";

jest.mock("axios");

jest.mock(
  "./data/currencies.json",
  () => [
    {
      symbol: "BTC",
      name: "Bitcoin",
      color: "#FF0000",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      color: "#00FF00",
    },
  ],
  { virtual: true }
);

jest.mock(
  "./data/funds.json",
  () => [
    {
      name: "Maybe Fund",
      symbols: ["BTC", "ETH"],
    },
  ],
  { virtual: true }
);

describe("fetchCurrencies", () => {
  it("fetches currencies", async () => {
    const fundName = "Maybe Fund";

    const currenciesResponse = {
      data: {
        BTC: {
          prices: [1, 2, 3],
          market_cap: 10,
        },
        ETH: {
          prices: [4, 5, 6],
          market_cap: 20,
        },
      },
    };

    axios.get.mockResolvedValueOnce(currenciesResponse);

    const currencies = await api.fetchCurrencies(fundName);

    const result = [
      {
        symbol: "ETH",
        name: "Ethereum",
        color: "#00FF00",
        prices: [4, 5, 6],
        marketCap: 20,
      },
      {
        symbol: "BTC",
        name: "Bitcoin",
        color: "#FF0000",
        prices: [1, 2, 3],
        marketCap: 10,
      },
    ];

    expect(axios.get).toHaveBeenCalledWith("/api/time_series?symbols=BTC,ETH");
    expect(result).toEqual(currencies);
  });
});
