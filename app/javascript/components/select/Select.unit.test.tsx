import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select, SelectableOption } from "./index";

test("Select", async () => {
  const options: SelectableOption[] = [
    {
      value: "value",
      details: <span data-testid="details">details</span>,
    },
  ];

  render(
    <Select options={options} selectedOption={null} onChange={() => null} />
  );

  fireEvent.click(screen.getByText("Select one"));
  const option = await screen.findByTestId("details");

  expect(option).toBeInTheDocument();
});
