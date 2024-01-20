import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";

import "../packs/tailwind.css";

import BogleheadsGrowthCalculator from "../tools/bogleheads-growth-calculator";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <BogleheadsGrowthCalculator />
    </ErrorBoundary>,
    document.getElementById("bogleheads-growth-calculator-app")
  );
});
