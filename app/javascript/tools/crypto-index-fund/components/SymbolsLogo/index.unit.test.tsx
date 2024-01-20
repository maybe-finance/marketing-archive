import React from "react";
import { render, screen } from "@testing-library/react";
import SymbolsLogo from "./index";

const symbols = ["AAA", "BBB", "CCC", "DDD", "EEE"];

test("limit number of currencies displayed", async () => {
  render(<SymbolsLogo symbols={symbols} />);
  const options = await screen.queryAllByRole("img");

  expect(options).toHaveLength(4);
});

test("display number of additional currencies", async () => {
  render(<SymbolsLogo symbols={symbols} />);

  expect(screen.getByText("+1")).toBeTruthy();
});

test("only display aditional number if more than limit", async () => {
  render(<SymbolsLogo symbols={symbols.slice(0, 3)} />);
  const options = await screen.queryAllByRole("img");

  expect(options).toHaveLength(3);
  expect(screen.queryByText("+", { exact: false })).toBeFalsy();
});
