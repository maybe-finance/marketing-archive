import React, { ReactNode, useState } from "react";
import classNames from "classnames";

let autoIdIncrement = 0;

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  type: string;
  value?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  fixedLeft?: ReactNode; // Content to render on the left side of the input
  fixedRight?: ReactNode; // Content to render on the right side of the input
  truncateLabel?: boolean; // Whether to truncate the label instead of wrapping when it doesn't fit on a single line
}

/**
 * Simple input component
 * (simplified version of Input from the design system)
 */
function Input({
  id,
  type,
  value,
  label,
  className,
  labelClassName,
  inputWrapperClassName,
  inputClassName,
  fixedLeft,
  fixedRight,
  truncateLabel = true,
  ...rest
}: InputProps): JSX.Element {
  [id] = useState(() => id ?? `input-autoid-${++autoIdIncrement}`);

  const combinedLabelClassName = classNames(
    labelClassName,
    "block mb-2 select-none",
    truncateLabel ? "truncate" : ""
  );

  const combinedInputClassName = classNames(
    inputClassName,
    "flex-1 px-0 border-0 bg-transparent appearance-none focus:ring-0 focus:outline-none"
  );

  const combinedInputWrapperClassName = classNames(
    inputWrapperClassName,
    "relative flex w-full min-w-20 h-12 px-3 rounded-lg appearance-none",
    "bg-black text-white leading-none",
    "focus-within:ring focus-within:ring-red focus-within:ring-opacity-50"
  );

  return (
    <div className={className}>
      <label htmlFor={id}>
        <span className={combinedLabelClassName}>{label}</span>
        <div className={combinedInputWrapperClassName}>
          {fixedLeft && (
            <div className="flex items-center justify-center pr-2.5 font-medium text-gray-100 text-center select-none">
              {fixedLeft}
            </div>
          )}
          <input
            size={1}
            className={combinedInputClassName}
            type={type}
            id={id}
            value={value}
            {...rest}
          />
          {fixedRight && (
            <div className="flex items-center justify-center pl-2.5 font-medium text-gray-100 text-center select-none">
              {fixedRight}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default Input;
