import React from "react";
import { IconProps } from ".";

export default function ExxonMobileIcon({
  className = "text-gray-100",
  size = 16,
}: IconProps): JSX.Element {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10.8268H2.76347L5.24765 7.70016L6.79647 9.23661L3.2523 13.5826H6.02545L8.29493 10.7022L12.5665 14.96H15.9144L9.77497 8.91377L14.61 2.93141H11.8352L8.26199 7.42474L6.71575 5.90251L10.6906 1H7.9233L5.20858 4.42075L3.73435 2.93141H0.43265L3.75824 6.21966L0 10.8268Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
