import React from "react";
import { render, screen } from "@testing-library/react";
import Tips from ".";

test("render tips", async () => {
  render(<Tips />);

  const content = await screen.findAllByTestId("tip-card");

  expect(content).toHaveLength(3);
});
