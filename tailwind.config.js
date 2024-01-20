/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./app/views/**/*", "./app/javascript/**/*.{ts,tsx,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#16161A",
      white: "#F8F9FA",
      gray: {
        DEFAULT: "#34363C",
        25: "#DEE2E6",
        50: "#ADB5BD",
        100: "#868E96",
        200: "#4B4F55",
        300: "#44474C",
        400: "#3D4045",
        500: "#34363C",
        600: "#2C2D32",
        700: "#232428",
        800: "#1C1C20",
      },
      purple: {
        500: "#6d07b0",
        600: "#6A06AB",
        DEFAULT: "#7209b7",
      },
      red: {
        500: "#e21c77",
        600: "#ff8787",
        DEFAULT: "#f72585",
      },
      teal: {
        500: "#1de4fc",
        DEFAULT: "#52edff",
      },
      blue: {
        100: "#748ffc",
        DEFAULT: "#4361ee",
      },
      lilac: "#cc5de8",
      green: {
        100: "#38d9a9",
        DEFAULT: "#20c997",
      },
      yellow: "#fcc419",
      orange: "#ff922b",
      pink: {
        600: "#F72585",
        DEFAULT: "#f06595",
      },
      twitter: "#55acee",
      discord: "#5965f2",
      "product-hunt": "rgb(218, 85, 47)",
      tiktok: "#fe2c55",
      youtube: "#ff0000",
      linkedin: "#0966c2",
      reddit: "#ff4402",
    },
    fontFamily: {
      sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
      display: ["'Monument Extended'", ...defaultTheme.fontFamily.sans],
    },
    // Override `fontSize` to not have a default `lineHeight`
    fontSize: {
      sm: ["0.75rem", "1rem"],
      base: ["0.875rem", "1.5rem"],
      lg: ["1rem", "1.5rem"],
      xl: ["1.125rem", "1.5rem"],
      "2xl": ["1.25rem", "2rem"],
      "3xl": ["1.5rem", "2rem"],
      "4xl": ["1.875rem", "2.5rem"],
      "5xl": ["2.5rem", "3.5rem"],
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        ...Object.fromEntries(
          [...new Array(192).keys()].map((value) => [value, `${value / 4}rem`])
        ),
      },
      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        "2/3-screen": "66.666667vh",
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
      }),
      maxHeight: (theme) => ({
        ...theme("spacing"),
      }),
      lineHeight: {
        normal: 1.4,
        heading: 1.3,
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: 0.4 },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.8) translateY(4px)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1) translateY(0px)",
          },
        },
        float: {
          from: { transform: "rotate(0deg) translateX(3px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(3px) rotate(-360deg)" },
        },
      },
      animation: {
        "flicker-slow": "flicker 5s linear infinite",
        "flicker-fast": "flicker 3s linear infinite",
        "fade-in": "fadeIn 1.5s ease-in-out 0s both",
        "fade-in-2": "fadeIn 1.5s ease-in-out 0.5s both",
        "fade-in-3": "fadeIn 1.5s ease-in-out 1s both",
        "fade-in-4": "fadeIn 1.5s ease-in-out 1.5s both",
        float: "float 5s infinite linear",
      },
      stroke: (theme) => theme("colors"),
      fill: (theme) => theme("colors"),
      strokeWidth: {
        3: "3",
        4: "4",
        10: "10",
      },
      zIndex: {
        "-10": "-10",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "edge-lg": "inset 0 0 200px 200px #16161a",
        "edge-md": "inset 0 0 150px 150px #16161a",
        "edge-sm": "inset 0 0 100px 100px #16161a",
      },
      gridTemplateColumns: {
        track: "1fr 0.87fr 1.12fr",
        ama: "1fr 1.42fr 1fr",
        simulate: "1fr 0.76fr 0.93fr",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      display: ["group-hover"],
      opacity: ["disabled"],
      outline: ["focus-visible"],
      pointerEvents: ["disabled"],
      ringColor: ["focus-visible", "group-focus"],
      ringOffsetColor: ["focus-visible", "group-focus"],
      ringOffsetWidth: ["focus-visible", "group-focus"],
      ringOpacity: ["focus-visible", "group-focus"],
      ringWidth: ["focus-visible", "group-focus"],
      scrollbar: ["rounded"],
      textDecoration: ["active"],
      translate: ["group-hover"],
      borderRadius: ["first", "last"],
    },
  },
  plugins: [
    require("@markusantonwolf/tailwind-css-plugin-multi-columns"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
