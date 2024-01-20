import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";

import "../packs/tailwind.css";

import Roadmap from "../pages/roadmap";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <Roadmap />
    </ErrorBoundary>,
    document.getElementById("roadmap-app")
  );
});
