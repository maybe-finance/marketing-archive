import React from "react";
import { ToolHeader } from "../../components/tool";
import Description from "./description";
import Social from "./social";
import Sparkline from "./sparkline";
import Calculator from "./calculator";

export default function CompoundInterestCalculator(): JSX.Element {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4">
        <ToolHeader
          title="Compound Interest Calculator"
          description="See how your investments grow over time by earning interest on interest and letting your money work for you."
          gradientClassName="from-white to-blue"
        />
        <Sparkline />
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-8">
        <Calculator />
      </div>

      <div className="mx-auto max-w-2xl px-4 mt-20">
        <Description />
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-20 mb-8">
        <Social />
      </div>
    </>
  );
}
