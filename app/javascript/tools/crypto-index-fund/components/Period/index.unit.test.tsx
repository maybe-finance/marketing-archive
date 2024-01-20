import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Period from ".";

test("tab is selected with period value", () => {
  const onChange = jest.fn();
  render(<Period period="all-time" onChange={onChange} />);

  const selectedTab = screen.getByRole("tab", { selected: true });
  expect(selectedTab.textContent).toBe("All Time");
});

test("tab click triggers onChange", async () => {
  const onChange = jest.fn();
  render(<Period period="all-time" onChange={onChange} />);

  const tabToSelect = screen.getByText("7D");
  fireEvent.click(tabToSelect);

  expect(onChange).toHaveBeenCalledWith("7d");
});

test("selected tab changes if props change", async () => {
  const onChange = jest.fn();
  const { rerender } = render(<Period period="all-time" onChange={onChange} />);

  let selectedTab = screen.getByRole("tab", { selected: true });
  expect(selectedTab.textContent).toBe("All Time");

  rerender(<Period period="7d" onChange={onChange} />);

  selectedTab = screen.getByRole("tab", { selected: true });
  expect(selectedTab.textContent).toBe("7D");
});
