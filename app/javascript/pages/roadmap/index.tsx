import React from "react";

import Header from "./components/header";
import Board from "./components/board";
import Disclaimer from "./components/disclaimer";
import Form from "./components/form";
import Social from "./components/social";
import Lines from "./components/lines";

export default function Roadmap(): JSX.Element {
  return (
    <div className="mb-16">
      <div className="relative">
        <Header />
        <Lines.Teal />
      </div>
      <Board />
      <div className="relative">
        <Disclaimer />
        <Lines.Red />
      </div>
      <div className="relative">
        <Form />
        <Lines.Yellow />
      </div>
      <Social />
    </div>
  );
}
