import React from "react";
import { render, screen } from "@testing-library/react";

import { Currency, Weights } from "../../types";
import Distribution from "./index";

const currencyFactory = (symbol: string, marketCap: number): Currency => ({
  symbol,
  marketCap,
  name: symbol,
  color: "",
  logo: "",
  prices: [],
});

test("Bar - render all bars", async () => {
  const weights: Weights = {
    AAA: 0.1,
    BBB: 0.1,
    CCC: 0.1,
    DDD: 0.1,
    EEE: 0.1,
    FFF: 0.1,
  };
  const currencies: Currency[] = [
    currencyFactory("AAA", 100),
    currencyFactory("BBB", 100),
    currencyFactory("CCC", 100),
    currencyFactory("DDD", 100),
    currencyFactory("EEE", 100),
    currencyFactory("FFF", 100),
  ];

  render(<Distribution weights={weights} currencies={currencies} />);
  const currencyBars = await screen.findAllByTestId("currency-bar");
  expect(currencyBars).toHaveLength(5);

  const otherBar = await screen.findAllByTestId("other-bar");
  expect(otherBar).toHaveLength(1);

  const unallocatedBar = await screen.findAllByTestId("unallocated-bar");
  expect(unallocatedBar).toHaveLength(1);
});

test("Bar - does not show unallocated if unallocated = 0", async () => {
  const weights: Weights = {
    AAA: 1,
  };
  const currencies: Currency[] = [currencyFactory("AAA", 100)];

  render(<Distribution weights={weights} currencies={currencies} />);

  const unallocatedBar = await screen.queryByTestId("unallocated-bar");
  expect(unallocatedBar).toBeNull();
});

test("Bar - render bars with the right size", async () => {
  const weights: Weights = {
    AAA: 0.3,
  };
  const currencies: Currency[] = [currencyFactory("AAA", 100)];

  render(<Distribution weights={weights} currencies={currencies} />);
  const currencyBars = await screen.findAllByTestId("currency-bar");
  expect(currencyBars[0]).toHaveStyle("width: 30%");
});

test("Legend - render all legends", async () => {
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
    currencyFactory("AAA", 100),
    currencyFactory("BBB", 100),
    currencyFactory("CCC", 100),
    currencyFactory("DDD", 100),
    currencyFactory("EEE", 100),
    currencyFactory("FFF", 100),
    currencyFactory("GGG", 100),
  ];

  render(<Distribution weights={weights} currencies={currencies} />);
  const currencyLegends = await screen.findAllByTestId("currency-legend");
  expect(currencyLegends).toHaveLength(5);
  expect(currencyLegends[0]).toHaveTextContent("10%");
  expect(currencyLegends[0]).toHaveTextContent("AAA");

  const otherLegend = await screen.findAllByTestId("other-legend");
  expect(otherLegend).toHaveLength(1);
  expect(otherLegend[0]).toHaveTextContent("20%");
  expect(otherLegend[0]).toHaveTextContent("Other");

  const unallocatedLegend = await screen.findAllByTestId("unallocated-legend");
  expect(unallocatedLegend).toHaveLength(1);
  expect(unallocatedLegend[0]).toHaveTextContent("30%");
  expect(unallocatedLegend[0]).toHaveTextContent("Unallocated");
});
