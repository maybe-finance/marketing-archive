import classNames from "classnames";
import React from "react";

interface CalculatingProps {
  isLoadingCurrencies: boolean;
}

const Calculating = ({
  isLoadingCurrencies,
}: CalculatingProps): JSX.Element => (
  <div
    className={classNames(
      "z-10 absolute inset-0 flex justify-center rounded-lg bg-black bg-opacity-80 transition-opacity duration-500",
      isLoadingCurrencies ? "opacity-100" : "opacity-0 invisible"
    )}
  >
    <p className="font-display font-extrabold text-xl md:text-2xl leading-heading mt-22">
      Calculating...
    </p>
  </div>
);

export default Calculating;
