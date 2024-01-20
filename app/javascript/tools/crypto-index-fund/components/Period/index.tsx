import React from "react";
import { Period as PeriodType } from "../../types";
import { Tab } from "@headlessui/react";

interface PeriodProps {
  period: PeriodType;
  onChange: (period: PeriodType) => void;
}

type PeriodLabels = {
  [key in PeriodType]: string;
};

const options: PeriodType[] = ["all-time", "1y", "90d", "30d", "7d"];

const labels: PeriodLabels = {
  "all-time": "All Time",
  "1y": "1Y",
  "90d": "90D",
  "30d": "30D",
  "7d": "7D",
};

export default function Period({ period, onChange }: PeriodProps): JSX.Element {
  const selectedIndex = options.indexOf(period);

  const handleChange = (index: number) => {
    onChange(options[index]);
  };

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={handleChange}>
      <Tab.List className="bg-black p-1.5 flex rounded-lg my-2 max-w-md flex-auto">
        {options.map((option) => (
          <Tab
            key={option}
            className={({ selected }) =>
              selected
                ? "text-white p-1.5 flex-grow rounded-md text-sm text-center font-medium min-w-8 bg-gray-800"
                : "text-white p-1.5 flex-grow rounded-md text-sm text-center font-medium min-w-8"
            }
          >
            {labels[option]}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
