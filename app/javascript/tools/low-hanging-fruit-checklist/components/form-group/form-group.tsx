import React, { ReactNode } from "react";

type FormGroupProps = {
  label: string;
  for: string;
  children: ReactNode;
};

export default function FormGroup(props: FormGroupProps): JSX.Element {
  return (
    <div className="items-center justify-between xs:flex">
      <label
        htmlFor={props.for}
        className="block mb-2 xs:w-2/5 md:w-1/2 xs:mr-2 xs:mb-0"
      >
        {props.label}
      </label>
      <div className="w-full xs:w-3/5 md:w-1/2">{props.children}</div>
    </div>
  );
}
