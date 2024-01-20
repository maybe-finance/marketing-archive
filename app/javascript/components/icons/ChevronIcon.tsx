import React from "react";
import { IconProps } from ".";

interface ChevronProps extends IconProps {
  orientation?: "up" | "down" | "left" | "right";
}

export default function ChevronIcon({
  className = "text-gray-100",
  size = 24,
  orientation = "up",
}: ChevronProps): JSX.Element {
  let rotation: number;

  switch (orientation) {
    case "up":
      rotation = 180;
      break;
    case "down":
      rotation = 0;
      break;
    case "left":
      rotation = 90;
      break;
    case "right":
      rotation = -90;
  }

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <g className="fill-current" transform={`rotate(${rotation}, 12, 12)`}>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
        </g>
      </svg>
    </div>
  );
}
