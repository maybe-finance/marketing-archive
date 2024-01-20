import React from "react";

export interface IconProps {
  active: boolean;
}

export default function CardIcon({ active }: IconProps): JSX.Element {
  return (
    <div className={`relative w-6 h-4 explode-icon ${active ? "explode" : ""}`}>
      <svg
        id="group-1"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-1-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-1-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-2"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-2-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-2-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-3"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-3-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-3-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-4"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-4-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-4-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-5"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-5-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-5-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-6"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-6-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-6-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="group-7"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="particle-7-1"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
        <circle
          id="particle-7-2"
          cx="2.68493"
          cy="2.65564"
          r="2.31481"
          fill="#FFBE2C"
        />
      </svg>

      <svg
        id="arrow"
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 0L20 10H0L10 0Z" />
      </svg>
    </div>
  );
}
