import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";

import "../packs/tailwind.css";
import "../packs/explode-effect.css";

import Vote from "../tools/vote";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <Vote />
    </ErrorBoundary>,
    document.getElementById("vote-app")
  );
});
