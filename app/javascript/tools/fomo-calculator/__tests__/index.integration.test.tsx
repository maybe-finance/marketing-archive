import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../index";

test("FOMO Calculator renders in browser", () => {
  render(<Home />);

  const toolTitle = screen.getByRole("heading", {
    name: /FOMO Calculator/,
  });
  const button = screen.getByRole("button", { name: /Calculate/ });

  expect(toolTitle).toHaveTextContent("FOMO Calculator");
  expect(button).toHaveTextContent("Calculate");
});
