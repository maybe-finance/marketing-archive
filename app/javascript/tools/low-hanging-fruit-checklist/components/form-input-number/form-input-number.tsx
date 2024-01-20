import React, { useState } from "react";

import FormInputWrapper from "../form-input-wrapper/form-input-wrapper";

type FormInputNumberProps = {
  id: string;
  value?: number;
  append?: string | ((value: number | "") => string);
  // `max` and `min` currently only work for the add & subtract buttons
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
};

export default function FormInputNumber(
  props: FormInputNumberProps
): JSX.Element {
  const [value, setValue] = useState<number | "">(
    typeof props.value === "number" ? props.value : ""
  );

  const onInputChange = (newValue: string): void => {
    if (newValue === "") {
      validateAndSetValue(newValue);
      return;
    }

    const parsed = parseInt(newValue, 10);

    if (Number.isNaN(parsed)) {
      return;
    }

    validateAndSetValue(parsed);
  };

  const validateAndSetValue = (newValue: number | "") => {
    // For explainer on this `numberValue`,
    // see the same code in `form-input-money.tsx`
    const numberValue = newValue || 0;

    setValue(newValue);

    if (typeof props.onChange === "function") {
      props.onChange(numberValue);
    }
  };

  const addOne = () => {
    const newValue = (value || 0) + 1;
    const validatedNewValue =
      typeof props.max === "number" ? Math.min(props.max, newValue) : newValue;
    validateAndSetValue(validatedNewValue);
  };

  const subtractOne = () => {
    const newValue = (value || 0) - 1;
    const validatedNewValue =
      typeof props.min === "number" ? Math.max(props.min, newValue) : newValue;
    validateAndSetValue(validatedNewValue);
  };

  return (
    <FormInputWrapper>
      <input
        id={props.id}
        type="text"
        inputMode="numeric"
        className="w-10 h-10 pl-3 pr-2 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {props.append && (
        <span className="text-gray-100">
          {typeof props.append === "function"
            ? props.append(value)
            : props.append}
        </span>
      )}
      <div className="flex pl-2 ml-auto">
        <button
          type="button"
          aria-label="Subtract one of your age"
          className="flex items-center justify-center w-8 h-10 focus:outline-none text-teal hover:text-red focus:text-red"
          onClick={() => subtractOne()}
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
          aria-label="Add one to your age"
          className="flex items-center justify-center w-8 h-10 focus:outline-none text-teal hover:text-red focus:text-red"
          onClick={() => addOne()}
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
    </FormInputWrapper>
  );
}
