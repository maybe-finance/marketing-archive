import React from "react";
import { render, screen } from "@testing-library/react";
import Chart from ".";
import { ChartData, Returns } from "../../types";

const data: ChartData = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
];

const returnsFactory = (returnPercentage: number): Returns => ({
  returnPercentage,
  returnMoney: 0,
  startMoney: 0,
  endMoney: 0,
  isNegative: returnPercentage < 0,
  isPositive: returnPercentage > 0,
  isNeutral: returnPercentage === 0,
});

test("renders line", () => {
  const returns = returnsFactory(1);

  render(<Chart data={data} returns={returns} />);

  const content = screen.getByTestId("line");

  expect(content).toBeInTheDocument();
});

test("renders green line if return is positive", () => {
  const returns = returnsFactory(1);

  render(<Chart data={data} returns={returns} />);

  const content = screen.getByTestId("line");

  expect(content).toHaveAttribute("stroke", "#38D9A9");
});

test("renders red line if return is negative", () => {
  const returns = returnsFactory(-1);

  render(<Chart data={data} returns={returns} />);

  const content = screen.getByTestId("line");

  expect(content).toHaveAttribute("stroke", "#f28b82");
});

test("renders gray line if return is zero", () => {
  const returns = returnsFactory(0);

  render(<Chart data={data} returns={returns} />);

  const content = screen.getByTestId("line");

  expect(content).toHaveAttribute("stroke", "#e1e1e6");
});
