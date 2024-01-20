import React from "react";
import { render, screen } from "@testing-library/react";
import Returns from "./index";

const returnsFactory = (returnPercentage: number): Returns => ({
  returnPercentage,
  returnMoney: 0,
  startMoney: 0,
  endMoney: 0,
  isNegative: returnPercentage < 0,
  isPositive: returnPercentage > 0,
  isNeutral: returnPercentage === 0,
});

test("display gain icon", () => {
  render(<Returns returns={returnsFactory(1)} />);

  const gainIcon = screen.getByTestId("gain");

  expect(gainIcon).toBeInTheDocument();
});

test("display loss icon", () => {
  render(<Returns returns={returnsFactory(-1)} />);

  const lossIcon = screen.getByTestId("loss");

  expect(lossIcon).toBeInTheDocument();
});

test("truncate return", () => {
  render(<Returns returns={returnsFactory(1.2345678)} />);

  const returns = screen.getByText("123.5%");

  expect(returns).toBeInTheDocument();
});

test("hide icon if returns is zero", () => {
  render(<Returns returns={returnsFactory(0)} />);

  const gainIcon = screen.queryByTestId("gain");
  const lossIcon = screen.queryByTestId("loss");

  expect(gainIcon).toBeNull();
  expect(lossIcon).toBeNull();
});
