import React from "react";
import { IconProps } from ".";

export default function AmericanAirlinesIcon({
  className = "text-gray-100",
  size = 16, // default figma export size
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
          d="M6.87247 11.0321L8.39309 13.5365C8.86446 14.287 9.64102 14.6277 10.6086 14.6277H14.5207L9.94078 9.12697L9.29102 8.76025L7.57638 9.31479L6.70752 10.5609L6.87247 11.0321Z"
          className="fill-current"
        />
        <path
          d="M9.9406 9.12705L8.98449 7.97839L6.45752 9.32551L6.72553 10.6853L6.87228 11.0322C6.81481 10.1106 8.41132 9.04062 9.9406 9.12705Z"
          className="fill-current"
        />
        <path
          d="M6.87243 11.0322L5.50523 8.79168C5.34053 8.53752 5.29541 8.31512 5.29541 8.05602C5.29541 7.77104 5.41799 7.61477 5.88877 7.36732C6.43719 7.10707 7.54135 6.9939 8.67958 6.9939C10.5291 6.9939 10.9725 7.5822 11.1613 8.21702C11.1613 8.21702 10.9002 8.11416 10.2859 8.11416C8.33745 8.11416 6.77993 9.05158 6.77993 10.471C6.77993 10.7688 6.87243 11.0322 6.87243 11.0322Z"
          className="text-gray-600 fill-current"
        />
        <path
          d="M1 1.50049H2.83904C3.61462 1.50049 3.93272 1.81494 4.24647 2.12345C4.60557 2.44699 5.69467 3.90793 7.99706 6.75932H5.50517C4.4862 6.75932 4.1639 6.58727 3.76981 5.99161L1 1.50049Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
