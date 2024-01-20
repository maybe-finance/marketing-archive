import React from "react";
import { IconProps } from ".";

export default function SP500Icon({
  className = "text-gray-100",
  size = 24,
}: IconProps): JSX.Element {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <path
          className="fill-current"
          d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"
        />
      </svg>
    </div>
  );
}
