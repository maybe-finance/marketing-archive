import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./index";
import type { Row as RowType } from "../../types";

jest.mock("../../../../components/slider", () => ({
  Slider: ({ value }) => <div>{`${value.toFixed(0)}%`}</div>,
  SliderVariant: () => <div>SliderVariant</div>,
}));

test("render rows", () => {
  const rows: RowType[] = [
    {
      changeWeight: jest.fn(),
      currency: {
        logo: "",
        color: "",
        name: "Bitcoin",
        prices: [111111.11, 222222.22],
        marketCap: 333333.33,
        symbol: "BTC",
      },
      amountInvested: 444444.44,
      currencyAmount: 555555.55,
      maxWeight: 1,
      weight: 0.25,
    },
    {
      changeWeight: jest.fn(),
      currency: {
        logo: "",
        color: "",
        marketCap: 0,
        name: "Ethereum",
        prices: [],
        symbol: "ETH",
      },
      currencyAmount: 0,
      amountInvested: 0,
      maxWeight: 1,
      weight: 0,
    },
  ];

  const weights = {
    isFullyAllocated: true,
  };

  render(<Table rows={rows} weights={weights} />);

  const content = screen.getAllByTestId("row");
  expect(content).toHaveLength(2);

  expect(content[0]).toHaveTextContent("Bitcoin");
  expect(content[0]).toHaveTextContent("BTC");
  expect(content[0]).toHaveTextContent("$111,111.11");
  expect(content[0]).toHaveTextContent("$333,333");
  expect(content[0]).toHaveTextContent("25%");
  expect(content[0]).toHaveTextContent("$444,444");
  expect(content[0]).toHaveTextContent("555,555.55 BTC");
});
