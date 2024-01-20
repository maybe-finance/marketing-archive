import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import formatter from "../../helpers/formatter";
import { Returns } from "../../types";

interface StartProps {
  returns: Returns;
}

export default function Start({ returns }: StartProps): JSX.Element {
  return (
    <div className="bg-black rounded-lg flex space-x-2 p-2.5 text-sm font-medium">
      <span className="text-gray-100">Start</span>
      <span className="text-white">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={returns.startMoney}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            ${formatter.currency(returns.startMoney, 0, 0)}
          </motion.div>
        </AnimatePresence>
      </span>
    </div>
  );
}
