import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Form from ".";

test("renders initial values", () => {
  const mockCallback = jest.fn();
  render(<Form onCalculate={mockCallback} />);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith({
    fundName: "Blue Chip",
    amountInvested: 1000,
    weighting: "market-cap-weighted",
  });
});

test("calculate with updated values", () => {
  const mockCallback = jest.fn();
  render(<Form onCalculate={mockCallback} />);

  fireEvent.change(screen.getByTestId("invested-amount"), {
    target: { value: "1122" },
  });

  fireEvent.click(screen.getByText("Blue Chip"));
  fireEvent.click(screen.getByText("Alt Coins"));

  fireEvent.click(screen.getByText("Market cap weighted"));
  fireEvent.click(screen.getByText("Custom"));

  expect(mockCallback).toHaveBeenCalledTimes(4);
  expect(mockCallback).toHaveBeenCalledWith({
    fundName: "Alt Coins",
    amountInvested: 1122,
    weighting: "custom",
  });
});
