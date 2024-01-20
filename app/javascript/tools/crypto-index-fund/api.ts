import axios from "axios";

import funds from "./data/funds.json";
import rawCurrencies from "./data/currencies.json";
import { Currency } from "./types";

const fetchCurrencies = async (fundName: string): Promise<Currency[]> => {
  const symbols: string[] = funds.find(
    (fund) => fund.name === fundName
  )?.symbols;

  const response = await axios.get(`/api/time_series?symbols=${symbols}`);

  return symbols
    .map((symbol) => ({
      ...rawCurrencies.find((currency) => currency.symbol === symbol),
      prices: response.data[symbol].prices.filter((price) => price > 0),
      marketCap: response.data[symbol].market_cap,
    }))
    .sort((a, b) => b.marketCap - a.marketCap);
};

export default {
  fetchCurrencies,
};
