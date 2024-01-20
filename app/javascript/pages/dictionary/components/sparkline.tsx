import React, { useEffect } from "react";

declare global {
  interface Window {
    initBackgroundSwoop: () => void;
  }
}

const line1 = (
  <svg
    width="1090"
    height="265"
    viewBox="0 0 1090 265"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1133.56 252.122C660.744 -209.947 475.928 463.043 12 12.1148"
      stroke="url(#paint0_linear_4754_41345)"
      strokeOpacity="0.3"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4754_41345"
        x1="740.929"
        y1="215.493"
        x2="4.7817"
        y2="40.6947"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F12980" />
        <stop offset="1" stopColor="#19181D" />
      </linearGradient>
    </defs>
  </svg>
);

const line2 = (
  <svg
    width="621"
    height="220"
    viewBox="0 0 621 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M608.893 92.5662C265.566 -54.1262 -10.9334 10.3734 -208.415 207.013"
      stroke="url(#paint0_linear_4754_41421)"
      strokeWidth="24"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4754_41421"
        x1="-190.934"
        y1="192.874"
        x2="407.566"
        y2="-31.1263"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#19181D" />
        <stop offset="1" stopColor="#7209B7" />
      </linearGradient>
    </defs>
  </svg>
);

const line3 = (
  <svg
    width="777"
    height="220"
    viewBox="0 0 777 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M829.893 127.434C486.566 274.126 210.067 209.627 12.5855 12.9871"
      stroke="url(#paint0_linear_4754_41423)"
      strokeWidth="24"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4754_41423"
        x1="30.0664"
        y1="27.1262"
        x2="628.566"
        y2="251.126"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#19181D" />
        <stop offset="1" stopColor="#52EDFF" />
      </linearGradient>
    </defs>
  </svg>
);

const line4 = (
  <svg
    width="991"
    height="344"
    viewBox="0 0 991 344"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M-73 36.4139C199.5 409.999 724.5 457.5 978.209 12.0328"
      stroke="url(#paint0_linear_4754_41422)"
      strokeWidth="24"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4754_41422"
        x1="956.32"
        y1="31.6848"
        x2="210.067"
        y2="187.427"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#19181D" />
        <stop offset="1" stopColor="#FCC419" />
      </linearGradient>
    </defs>
  </svg>
);

// Reference:
// https://www.figma.com/file/k0RpwgtCk1ZAxjIjUQCQ49/Branding-Assets?node-id=806%3A42
const lines = [line1, line2, line3, line4];

type SparklineProps = {
  className: string;
  variant: 0 | 1 | 2 | 3;
  direction: "ltr" | "rtl";
};

const Sparkline = ({
  className = "right-0 bottom-0 text-teal",
  direction = "ltr",
  variant = 0,
}: SparklineProps): JSX.Element => {
  useEffect(() => {
    window?.initBackgroundSwoop();
  }, []);

  return (
    <div
      className={`absolute js-background-swoop ${className}`}
      data-direction={direction}
    >
      {lines[variant]}
    </div>
  );
};

export default Sparkline;
