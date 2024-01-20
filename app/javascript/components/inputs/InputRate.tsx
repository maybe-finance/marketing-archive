import React from "react";
import { Input, InputProps } from ".";
import {
  DECIMAL_SEPARATOR,
  THOUSANDS_SEPARATOR,
  formatNumber,
  parseNumber,
} from "../../util/localization";
import useInputFormatting from "./hooks/useInputFormatting";
import Rate from "./icons/Rate";

export interface InputRateProps extends Omit<InputProps, "type" | "value"> {
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
export default function InputRate({
  value,
  onValueChange,
  restrictInput = true,
  allowNegative = true,
  min,
  max,
  onBlur,
  onChange,
  ...rest
}: InputRateProps): JSX.Element {
  if (!allowNegative) {
    if (min === undefined) {
      min = 0;
    } else {
      min = Math.max(min, 0);
    }
  }

  const {
    rawValue,
    parsedValue,
    setRawValue,
    isValidInput,
    formatRawValue,
    updateParsedValue,
  } = useInputFormatting(
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
    (value) => (value !== null ? formatNumber(value, 1) + "%" : ""),
    new RegExp(
      `^${
        allowNegative ? "-?" : ""
      }[\\d${THOUSANDS_SEPARATOR}]*\\${DECIMAL_SEPARATOR}?\\d{0,2}%?$`
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
      fixedLeft={
        <div style={{ width: "1em" }}>
          <Rate />
        </div>
      }
      fixedRight={
        <div className="flex">
          <button
            type="button"
            aria-label="Subtract one percent"
            className="flex items-center justify-center focus:outline-none text-teal hover:text-red focus:text-red disabled:opacity-40 disabled:pointer-events-none"
            disabled={
              allowNegative ? false : parsedValue !== null && parsedValue < 1
            }
            onClick={() => updateParsedValue((parsedValue || 0) - 1)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.58366 10.8334C4.35354 10.8334 4.16699 10.6469 4.16699 10.4167V9.58341C4.16699 9.3533 4.35354 9.16675 4.58366 9.16675H15.417C15.6471 9.16675 15.8337 9.3533 15.8337 9.58341V10.4167C15.8337 10.6469 15.6471 10.8334 15.417 10.8334H4.58366Z"
                className="fill-current"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Add one percent"
            className="flex items-center justify-center focus:outline-none text-teal hover:text-red focus:text-red"
            onClick={() => updateParsedValue((parsedValue || 0) + 1)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8337 9.58342V10.4167C15.8337 10.6469 15.6471 10.8334 15.417 10.8334H10.8337V15.4167C10.8337 15.6469 10.6471 15.8334 10.417 15.8334H9.58366C9.35354 15.8334 9.16699 15.6469 9.16699 15.4167V10.8334H4.58366C4.35354 10.8334 4.16699 10.6469 4.16699 10.4167V9.58342C4.16699 9.3533 4.35354 9.16675 4.58366 9.16675H9.16699V4.58341C9.16699 4.3533 9.35354 4.16675 9.58366 4.16675H10.417C10.6471 4.16675 10.8337 4.3533 10.8337 4.58341V9.16675H15.417C15.6471 9.16675 15.8337 9.3533 15.8337 9.58342Z"
                className="fill-current"
              />
            </svg>
          </button>
        </div>
      }
      {...rest}
    />
  );
}
