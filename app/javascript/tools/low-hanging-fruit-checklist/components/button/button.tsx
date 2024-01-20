import React, { MouseEvent, ReactNode } from "react";

export type ButtonProps = {
  label?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

export default function Button(props: ButtonProps): JSX.Element {
  const type = props.type || "button";

  return (
    <button
      type={type}
      className="bg-teal text-black font-semibold rounded-lg w-full h-10 leading-none px-2.5 whitespace-nowrap hover:bg-red hover:text-white focus:bg-red focus:text-white transition-colors duration-200 focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
