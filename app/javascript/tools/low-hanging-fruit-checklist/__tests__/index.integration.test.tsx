import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../index";

test("Low Hanging Fruit tool renders in the browser", () => {
  render(<Home />);

  const toolTitle = screen.getByRole("heading");
  const button = screen.getByRole("button", { name: /Yes, let's do it!/ });

  expect(toolTitle).toHaveTextContent("Financial Low‑Hanging Fruit Checklist");
  expect(button).toHaveTextContent("Yes, let's do it!");
});
