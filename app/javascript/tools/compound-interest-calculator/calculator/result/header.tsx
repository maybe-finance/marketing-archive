import React from "react";
import { Form, Result } from "../types";

type HeaderProps = {
  form: Form;
  result: Result;
};

export default function Header({ result, form }: HeaderProps): JSX.Element {
  return (
    <div className="overflow-hidden">
      <div className="text-base text-gray-300 mb-3">
        Total value of investment after {form.yearsToGrow} years
      </div>
      <div className="font-display text-2xl sm:text-3xl font-black truncate">
        ${result.totalValue.integer}
        <span className="text-gray-100 text-xl sm:text-2xl font-black">
          .{result.totalValue.decimal}
        </span>
      </div>
    </div>
  );
}
