import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Result } from "../types";

type InfoProps = {
  year: number;
  result: Result;
};

export default function Info({ year, result }: InfoProps): JSX.Element {
  const contributed = result.contributed[year];
  const interest = result.interest[year];
  const total = result.total[year];

  const currency = (value: number) => {
    const numberFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

    return numberFormat.split(".")[0];
  };

  const items: [string, string][] = [
    ["Year", year + ""],
    ["Contributed", currency(contributed)],
    ["Interest", currency(interest)],
    ["Total value", currency(total)],
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:flex sm:justify-around">
      {items.map(([label, value]) => (
        <div
          className="flex flex-col items-center gap-1 flex-1 overflow-hidden"
          key={label}
        >
          <div className="font-semibold text-white text-base">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={value}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {value}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="font-normal text-gray-500 text-sm">{label}</div>
        </div>
      ))}
    </div>
  );
}
