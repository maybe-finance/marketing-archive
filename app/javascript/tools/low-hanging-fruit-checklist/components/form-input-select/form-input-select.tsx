import React, { useState } from "react";

import FormInputWrapper from "../form-input-wrapper/form-input-wrapper";

export type FormInputSelectOption<T> = {
  value: T;
  label: string;
};

type FormInputSelectProps<T> = {
  id: string;
  value: T;
  options: FormInputSelectOption<T>[];
  onChange?: (value: T) => void;
};

export default function FormInputNumber<T extends { toString(): string }>(
  props: FormInputSelectProps<T>
): JSX.Element {
  const [value, setValue] = useState(props.value);

  const onInputChange = (stringValue: string): void => {
    const option = props.options.find(
      ({ value: v }) => v.toString() === stringValue
    );

    if (!option) {
      return;
    }

    setValue(option.value);

    if (typeof props.onChange === "function") {
      props.onChange(option.value);
    }
  };

  return (
    <FormInputWrapper>
      <div className="relative flex w-full">
        <select
          id={props.id}
          className="flex-1 w-10 h-10 px-3 text-white bg-transparent border-0 appearance-none bg-none tabular-nums focus:ring-0 focus:outline-none"
          value={value.toString()}
          onChange={(e) => onInputChange(e.target.value)}
        >
          {props.options.map(({ value: optionValue, label }) => (
            <option
              value={optionValue.toString()}
              key={optionValue.toString()}
              className="font-sans text-black"
            >
              {label}
            </option>
          ))}
        </select>
        <div className="absolute top-0 right-0 flex items-center justify-center w-8 h-10 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6002 13.15C10.4831 13.2672 10.3242 13.3332 10.1585 13.3333H9.84187C9.67652 13.3314 9.5183 13.2657 9.4002 13.15L5.1252 8.86664C5.04632 8.78841 5.00195 8.68191 5.00195 8.57081C5.00195 8.45971 5.04632 8.35321 5.1252 8.27497L5.71687 7.68331C5.79367 7.60492 5.89879 7.56075 6.00854 7.56075C6.11828 7.56075 6.2234 7.60492 6.3002 7.68331L10.0002 11.3916L13.7002 7.68331C13.7784 7.60443 13.8849 7.56006 13.996 7.56006C14.1071 7.56006 14.2136 7.60443 14.2919 7.68331L14.8752 8.27497C14.9541 8.35321 14.9985 8.45971 14.9985 8.57081C14.9985 8.68191 14.9541 8.78841 14.8752 8.86664L10.6002 13.15Z"
              fill="#52EDFF"
            />
          </svg>
        </div>
      </div>
    </FormInputWrapper>
  );
}
