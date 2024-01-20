import React from "react";
import { Input, InputProps } from ".";
import {
  formatNumber,
  parseNumber,
  DECIMAL_SEPARATOR,
  THOUSANDS_SEPARATOR,
} from "../../util/localization";
import useInputFormatting from "./hooks/useInputFormatting";

export interface InputCurrencyProps extends Omit<InputProps, "type" | "value"> {
  value?: number;
  onValueChange?: (value: number) => void; // Callback for when the numerical value changes
  restrictInput?: boolean; // Whether to prevent the user from typing non-numeric characters
  allowNegative?: boolean; // Whether to allow negative inputs
  min?: number;
  max?: number;
}

/**
 * Input for numerical currency values
 */
export default function InputCurrency({
  value,
  onValueChange,
  restrictInput = true,
  allowNegative = true,
  min,
  max,
  onBlur,
  onChange,
  ...rest
}: InputCurrencyProps): JSX.Element {
  if (!allowNegative) {
    if (min === undefined) {
      min = 0;
    } else {
      min = Math.max(min, 0);
    }
  }

  const { rawValue, setRawValue, isValidInput, formatRawValue } =
    useInputFormatting(
      value,
      (value): number | null => {
        if (value === "") {
          return min ?? 0;
        }
        let parsed = parseNumber(value);
        if (Number.isNaN(parsed)) {
          return null;
        }
        if (min !== undefined) {
          parsed = Math.max(parsed, min);
        }
        if (max !== undefined) {
          parsed = Math.min(parsed, max);
        }
        return parsed;
      },
      (value) => (value !== null ? formatNumber(value, 0) : ""),
      new RegExp(
        `^${
          allowNegative ? "-?" : ""
        }[\\d${THOUSANDS_SEPARATOR}]*\\${DECIMAL_SEPARATOR}?\\d{0,2}$`
      ),
      onValueChange
    );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    formatRawValue();
    onBlur && onBlur(e);
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (
      restrictInput &&
      e.target.value !== "" &&
      !isValidInput(e.target.value)
    ) {
      return;
    }
    setRawValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <Input
      type="text"
      value={rawValue}
      onBlur={handleBlur}
      onChange={handleChange}
      fixedLeft={<div style={{ width: "1em" }}>$</div>}
      {...rest}
    />
  );
}
