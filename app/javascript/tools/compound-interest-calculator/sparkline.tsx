import React, { useEffect } from "react";

declare global {
  interface Window {
    initBackgroundSwoop: () => void;
  }
}

const line1 = (
  <svg
    width="1440"
    height="435"
    viewBox="0 0 1440 435"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.2"
      d="M1532 425C1445.1 350.786 1204.37 202.359 936.658 202.359C602.019 202.359 636.1 366.584 345.276 366.584C112.616 366.584 -11.9446 85.5281 -70 -55"
      stroke="url(#paint0_linear_5244_93)"
      strokeOpacity="0.8"
      strokeWidth="24"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5244_93"
        x1="1078.53"
        y1="57.9245"
        x2="51.5046"
        y2="104.912"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FEF0F7" stopOpacity="0" />
        <stop offset="0.469941" stopColor="#FEF0F7" />
        <stop offset="1" stopColor="#5A80FC" />
      </linearGradient>
    </defs>
  </svg>
);

// Reference:
// https://www.figma.com/file/k0RpwgtCk1ZAxjIjUQCQ49/Branding-Assets?node-id=806%3A42
const lines = [line1];

type SparklineProps = {
  className?: string;
  variant?: 0;
  direction?: "ltr" | "rtl";
};

const Sparkline = ({
  className = "text-blue left-0 top-0",
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
