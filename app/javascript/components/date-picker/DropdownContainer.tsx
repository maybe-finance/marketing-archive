import React from "react";

export interface DropdownContainerProps {
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
}

export function DropdownContainer({
  isOpen = false,
  children,
}: DropdownContainerProps): JSX.Element {
  return (
    <div
      className={
        isOpen ? "absolute left-0 top-14 w-full bg-transparent" : "hidden"
      }
    >
      <div className="w-full flex justify-center">
        <div className="w-11/12 bg-black z-20 border border-gray-500 border-opacity-50 rounded-md p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
