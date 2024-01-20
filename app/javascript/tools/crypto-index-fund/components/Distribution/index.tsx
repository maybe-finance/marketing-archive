import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Currency, Weights } from "../../types";
import Bar from "./Bar";
import Legend from "./Legend";
import useDistribution from "./useDistribution";

interface DistributionProps {
  currencies: Currency[];
  weights: Weights;
}

export default function Distribution({
  currencies,
  weights,
}: DistributionProps): JSX.Element {
  const distribution = useDistribution(weights, currencies);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={distribution.topCurrencies.map(({ name }) => name).join("-")}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className="space-y-3"
      >
        <Bar weights={weights} distribution={distribution} />
        <Legend weights={weights} distribution={distribution} />
      </motion.div>
    </AnimatePresence>
  );
}
