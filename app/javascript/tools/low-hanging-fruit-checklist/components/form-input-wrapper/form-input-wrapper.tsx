import React, { ReactNode } from "react";

type FormInputWrapperProps = {
  children?: ReactNode;
};

export default function FormInputWrapper({
  children,
}: FormInputWrapperProps): JSX.Element {
  return (
    <div className="flex items-center w-full rounded-lg bg-full-black focus-within:ring-2 focus-within:ring-teal">
      {children}
    </div>
  );
}
