import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import formatter from "../../helpers/formatter";
import { Returns } from "../../types";

interface EndProps {
  returns: Returns;
}

export default function End({ returns }: EndProps): JSX.Element {
  const resultClassName = () => {
    if (returns.isPositive) {
      return "text-green-100";
    }
    if (returns.isNegative) {
      return "text-red-600";
    }
  };

  return (
    <div className="bg-black rounded-lg flex space-x-2 p-2.5 text-sm font-medium">
      <span className={`text-white ${resultClassName()}`}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={returns.endMoney}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            ${formatter.currency(returns.endMoney, 0, 0)}
          </motion.div>
        </AnimatePresence>
      </span>
      <span className="text-gray-100">Today</span>
    </div>
  );
}
