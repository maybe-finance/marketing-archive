import React from "react";
import { Weights } from "../../types";
import type { Distribution } from "./useDistribution";
import config from "./config";
import { AnimatePresence, motion } from "framer-motion";

interface LegendProps {
  weights: Weights;
  distribution: Distribution;
}

export default function Legend({
  weights,
  distribution,
}: LegendProps): JSX.Element {
  return (
    <div className="flex justify-between">
      <div>
        {distribution.topCurrencies.map((currency) => (
          <span
            key={currency.symbol}
            className="space-x-2 mr-4 inline-block whitespace-nowrap"
            data-testid="currency-legend"
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: currency.color }}
            />
            <span className="text-white text-xs">{currency.name}</span>
            <span className="text-gray-100 text-xs">
              {(weights[currency.symbol] * 100).toFixed(0)}%
            </span>
          </span>
        ))}
        {distribution.showOther && (
          <span
            className="space-x-2 mr-4 inline-block whitespace-nowrap"
            data-testid="other-legend"
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: config.colors.other }}
            />
            <span className="text-white text-xs">Other</span>
            <span className="text-gray-100 text-xs">
              {(distribution.other * 100).toFixed(0)}%
            </span>
          </span>
        )}
      </div>
      <div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={distribution.showUnallocated ? "unallocated" : "allocated"}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
          >
            {distribution.showUnallocated && (
              <span
                className="space-x-2 mr-4 inline-block whitespace-nowrap"
                data-testid="unallocated-legend"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: config.colors.unallocated }}
                />
                <span
                  className="text-white text-xs"
                  style={{ color: config.colors.unallocated }}
                >
                  Unallocated
                </span>
                <span className="text-gray-100 text-xs">
                  {(distribution.unallocated * 100).toFixed(0)}%
                </span>
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
