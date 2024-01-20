import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import CryptoIndexFund from "../tools/crypto-index-fund";

import "../packs/tailwind.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary>
      <CryptoIndexFund />
    </ErrorBoundary>,
    document.getElementById("crypto-index-fund-app")
  );
});
