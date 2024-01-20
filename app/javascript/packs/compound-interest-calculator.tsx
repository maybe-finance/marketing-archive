import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import CompoundInterestCalculator from "../tools/compound-interest-calculator";

import "../packs/tailwind.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <CompoundInterestCalculator />
    </ErrorBoundary>,
    document.getElementById("compound-interest-calculator-app")
  );
});
