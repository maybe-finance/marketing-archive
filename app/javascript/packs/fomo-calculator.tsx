import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";

import "../packs/tailwind.css";

import FOMOCalculator from "../tools/fomo-calculator/index";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <FOMOCalculator />
    </ErrorBoundary>,
    document.getElementById("fomo-calculator-app")
  );
});
