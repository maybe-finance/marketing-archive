import React from "react";
import ReactDOM from "react-dom";

import "../packs/tailwind.css";

import LowHangingFruitChecklist from "../tools/low-hanging-fruit-checklist";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <LowHangingFruitChecklist />,
    document.getElementById("low-hanging-fruit-checklist-app")
  );
});
