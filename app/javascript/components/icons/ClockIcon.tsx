import React from "react";
import { IconProps } from ".";

export default function ClockIcon({
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
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          className="fill-current"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
        />
      </svg>
    </div>
  );
}
