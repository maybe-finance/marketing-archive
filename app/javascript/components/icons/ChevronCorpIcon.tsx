import React from "react";
import { IconProps } from ".";

export default function ChevronCorpIcon({
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
          d="M0.842285 5.7681V1L7.99624 3.38418L0.842285 5.7681Z"
          className="fill-current"
        />
        <path
          d="M0.844238 5.76837L7.99639 8.15228L15.1481 5.76837V1.00049L7.99639 3.3841L0.844238 5.76837Z"
          className="fill-current"
        />
        <path
          d="M0.842901 11.9525L0.842285 7.18286L7.99575 9.56692L0.842901 11.9525Z"
          className="fill-current"
        />
        <path
          d="M15.1486 7.18286L7.99445 9.56616L0.84375 11.9516L7.99581 14.3362L15.1486 11.9509V7.18286Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
