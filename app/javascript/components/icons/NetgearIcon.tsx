import React from "react";
import { IconProps } from ".";

export default function NetgearIcon({
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
          d="M4 13V3H6.44286L10.5571 9.14285V3H13V13H10.5571L6.44286 6.81255V13H4Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
