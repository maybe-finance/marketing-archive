import React from "react";
import ReactDOM from "react-dom";

import "../packs/tailwind.css";

import FreedomCalculator from "../tools/freedom-calculator";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <FreedomCalculator />,
    document.getElementById("freedom-calculator-app")
  );
});
