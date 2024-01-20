import React, { ReactNode } from "react";
import classNames from "classnames";

export enum ButtonVariant {
  Red,
  White,
  Teal,
  Gray,
}

const ButtonVariantClassNames = Object.freeze({
  [ButtonVariant.Red]:
    "bg-red text-white hover:bg-red-500 focus-visible:ring-red",
  [ButtonVariant.White]:
    "bg-white text-black hover:bg-gray-100 focus-visible:ring-white",
  [ButtonVariant.Teal]:
    "bg-teal text-black hover:bg-gray-100 focus-visible:ring-white",
  [ButtonVariant.Gray]:
    "bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-white",
});

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  variant?: ButtonVariant;
  className?: string;
  inline?: boolean;
  children?: ReactNode;
}

export default function Button({
  type = "button",
  variant = ButtonVariant.Red,
  inline = false,
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={classNames(
        className,
        inline ? "w-auto" : "w-full",
        "h-12 px-4 rounded-lg leading-none",
        "font-semibold truncate select-none",
        "focus:outline-none focus-visible:ring focus-visible:ring-opacity-50",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transition-colors duration-200",
        ButtonVariantClassNames[variant]
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
