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
    <div
      className="absolute right-0 top-1/4 text-teal js-background-swoop"
      data-direction="rtl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1038"
        height="269"
        fill="none"
        viewBox="0 0 1038 269"
      >
        <path
          stroke="url(#paint0_linear_4366_36884)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
          d="M1253 256c-67.26-37.571-253.596-112.712-460.814-112.712-259.022 0-232.641 83.139-457.749 83.139C154.351 226.427 57.937 84.142 13 13"
          opacity="0.3"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_4366_36884"
            x1="3"
            x2="857.794"
            y1="13"
            y2="221.455"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4CC9F0" stopOpacity="0"></stop>
            <stop offset="0.381" stopColor="#4CC9F0" stopOpacity="0.31"></stop>
            <stop offset="1" stopColor="#52EDFF"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Red = (): JSX.Element => (
  <div className="absolute top-0 left-0 text-red js-background-swoop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="983"
      height="269"
      fill="none"
      viewBox="0 0 983 269"
    >
      <path
        stroke="url(#paint0_linear_4373_37994)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        d="M-270 256c67.264-37.571 253.596-112.712 460.814-112.712 259.022 0 232.641 83.139 457.749 83.139C828.649 226.427 925.063 84.142 970 13"
        opacity="0.3"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_4373_37994"
          x1="1022"
          x2="104.5"
          y1="-58"
          y2="200.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.093" stopColor="#FF2689" stopOpacity="0"></stop>
          <stop offset="0.646" stopColor="#F72585" stopOpacity="0.67"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Yellow = (): JSX.Element => (
  <div
    className="absolute right-0 bottom-0 text-yellow js-background-swoop"
    data-direction="rtl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="825"
      height="235"
      fill="none"
      viewBox="0 0 825 235"
    >
      <path
        stroke="url(#paint0_linear_4376_38061)"
        strokeWidth="20"
        d="M8 7c51.386 52.76 150.897 160.302 328.469 160.302 177.571 0 245.399-109.08 373.269-118.773C837.609 38.834 994.168 144.085 1078 227"
        opacity="0.2"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_4376_38061"
          x1="335.5"
          x2="106.066"
          y1="160.374"
          y2="-75.519"
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
  Red,
  Yellow,
};
