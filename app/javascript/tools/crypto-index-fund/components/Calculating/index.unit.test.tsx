import React from "react";
import { render, screen } from "@testing-library/react";
import Calculating from ".";

test("Calculating", async () => {
  render(<Calculating />);

  const content = await screen.findAllByText("Calculating...");

  expect(content).toHaveLength(1);
});
