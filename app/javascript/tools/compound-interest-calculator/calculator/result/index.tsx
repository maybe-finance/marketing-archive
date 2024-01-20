import React, { useEffect, useState } from "react";
import { ParentSize } from "@visx/responsive";

import Header from "./header";
import Legend from "./legend";
import Chart from "./chart";
import Info from "./info";
import useCompoundCalculator from "./useCompoundCalculator";
import type { Form } from "../types";

type ResultProps = {
  form: Form;
};

export default function Result({ form }: ResultProps): JSX.Element {
  const result = useCompoundCalculator(form);
  const [selectedYear, setSelectedYear] = useState(form.yearsToGrow);

  const onYearHover = (year: number | null) => {
    if (year === null) {
      return setSelectedYear(form.yearsToGrow);
    }

    setSelectedYear(year);
  };

  useEffect(() => {
    setSelectedYear(form.yearsToGrow);
  }, [form.yearsToGrow]);

  return (
    <div className="w-full min-w-0">
      <div className="bg-black px-10 pt-10 rounded-t-xl">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end mb-8">
          <Header result={result} form={form} />
          <Legend />
        </div>
        <ParentSize>
          {({ width }) => (
            <Chart result={result} onYearHover={onYearHover} width={width} />
          )}
        </ParentSize>
      </div>
      <div className="bg-gradient-to-b from-black to-bg-gray-900 p-10 rounded-b-xl">
        <Info year={selectedYear} result={result} />
      </div>
    </div>
  );
}
