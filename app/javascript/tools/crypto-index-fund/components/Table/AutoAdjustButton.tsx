import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Tooltip } from "../../../../components/tooltip";
import type { WeightsHook } from "../../useWeights";

export interface AutoAdjustButtonProps {
  weights: WeightsHook;
}

const AutoAdjustButton = ({ weights }: AutoAdjustButtonProps): JSX.Element => {
  const renderContent = () => {
    if (weights.isFullyAllocated) {
      return (
        <div className="h-10 mt-1 flex justify-end items-center">Weighting</div>
      );
    }

    return (
      <div className="flex justify-end items-center">
        <div>
          Weighting{" "}
          <span className="text-red font-medium">
            ({(weights.weightAllocated * 100).toFixed(0)}%)
          </span>
        </div>
        <Tooltip content="Auto adjust to 100%">
          <button
            onClick={weights.distributeRemainingWeight}
            type="button"
            className="text-red hover:bg-red hover:bg-opacity-10 rounded-xl w-10 h-10 ml-2 mt-1"
          >
            <i className="ri-equalizer-line" />
          </button>
        </Tooltip>
      </div>
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={weights.isFullyAllocated ? "unallocated" : "allocated"}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 20 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.15 }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default AutoAdjustButton;
