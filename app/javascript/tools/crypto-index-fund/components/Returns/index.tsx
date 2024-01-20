import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import formatter from "../../helpers/formatter";
import { Returns as ReturnsType } from "../../types";

export interface ReturnsProps {
  returns: ReturnsType;
}

export default function Returns({ returns }: ReturnsProps): JSX.Element {
  const percentageLabel = `${formatter.currency(
    returns.returnPercentage * 100,
    0,
    1
  )}%`;

  const moneyLabel = `$${formatter.currency(Math.abs(returns.returnMoney))}`;

  const moneyClassName = () => {
    if (returns.isPositive) {
      return "text-green-100";
    }
    if (returns.isNegative) {
      return "text-red-600";
    }
  };

  const moneySignal = () => {
    if (returns.isPositive) {
      return "+";
    }
    if (returns.isNegative) {
      return "-";
    }

    return "";
  };

  const percentageIcon = () => {
    if (returns.isPositive) {
      return (
        <i
          className="ri-arrow-right-up-line ri-3x text-green-100 leading-3"
          data-testid="gain"
        />
      );
    }
    if (returns.isNegative) {
      return (
        <i
          className="ri-arrow-right-down-line ri-3x text-red-600 leading-3"
          data-testid="loss"
        />
      );
    }

    return "";
  };

  return (
    <div className="absolute left-0 right-0" style={{ top: 65 }}>
      <div className="flex flex-col items-center">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={percentageLabel}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex justify-center items-center space-x-1">
              {percentageIcon()}
              <span className="font-display text-white font-extrabold text-4xl">
                {percentageLabel}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        <span
          className={`font-display font-extrabold text-2xl ${moneyClassName()}`}
        >
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={moneyLabel}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              {`${moneySignal()} ${moneyLabel}`}
            </motion.div>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
