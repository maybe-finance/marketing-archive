import React, { useEffect } from "react";

declare global {
  interface Window {
    initBackgroundSwoop: () => void;
  }
}

const Teal = (): JSX.Element => {
  useEffect(() => {
    window?.initBackgroundSwoop();
  }, []);

  return (
    <div className="absolute left-0 right-0 text-teal js-background-swoop">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="846"
        height="232"
        fill="none"
        viewBox="0 0 846 232"
      >
        <path
          stroke="url(#paint0_linear_3921_27529)"
          strokeLinecap="round"
          strokeWidth="24"
          d="M-182.668 219.34c54.194-25.094 114.921-149.429 338.707-146.573 223.785 2.857 233.744 90.984 419.94 78.389C724.935 141.08 799.219 54.904 833.656 12"
          opacity="0.5"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_3921_27529"
            x1="377.362"
            x2="747.287"
            y1="207.874"
            y2="-27.187"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#52EDFF"></stop>
            <stop offset="1" stopColor="#19181D"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Purple = (): JSX.Element => (
  <div
    className="absolute top-0 right-0 text-purple js-background-swoop"
    data-direction="rtl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="607"
      height="220"
      fill="none"
      viewBox="0 0 607 220"
    >
      <path
        stroke="url(#paint0_linear_3921_27533)"
        strokeLinecap="round"
        strokeWidth="24"
        d="M829.893 127.106C486.566 273.799 210.067 209.299 12.585 12.66"
        opacity="0.5"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_3921_27533"
          x1="40.566"
          x2="628.566"
          y1="-0.654"
          y2="250.799"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#19181D"></stop>
          <stop offset="1" stopColor="#7209B7"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Yellow = (): JSX.Element => (
  <div className="absolute left-0 bottom-0 text-yellow js-background-swoop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="602"
      height="383"
      fill="none"
      viewBox="0 0 602 383"
    >
      <path
        stroke="url(#paint0_linear_3921_27595)"
        strokeWidth="24"
        d="M-651 373c67.427-56.588 254.209-169.764 461.929-169.764C175.354 203.236 325.5 395 592 7"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_3921_27595"
          x1="-226.5"
          x2="546"
          y1="296"
          y2="53.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCC419"></stop>
          <stop offset="1" stopColor="#19181D"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default {
  Teal,
  Purple,
  Yellow,
};
