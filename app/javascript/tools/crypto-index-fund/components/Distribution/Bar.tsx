import React from "react";

import { Weights } from "../../types";
import type { Distribution } from "./useDistribution";
import config from "./config";
interface BarProps {
  distribution: Distribution;
  weights: Weights;
}

export default function Bar({ weights, distribution }: BarProps): JSX.Element {
  return (
    <div className="bg-black p-1.5 flex flex-wrap rounded-lg">
      {distribution.topCurrencies
        .filter((currency) => weights[currency.symbol])
        .map((currency) => (
          <div
            data-testid="currency-bar"
            key={currency.symbol}
            className="h-3 first:rounded-l-md last:rounded-r-md"
            style={{
              width: `${Math.round(weights[currency.symbol] * 100)}%`,
              backgroundColor: currency.color,
            }}
          />
        ))}
      {distribution.showOther && distribution.other > 0 && (
        <div
          data-testid="other-bar"
          className="h-3 first:rounded-l-md last:rounded-r-md"
          style={{
            width: `${Math.round(distribution.other * 100)}%`,
            backgroundColor: config.colors.other,
          }}
        />
      )}
      {distribution.showUnallocated && (
        <div
          data-testid="unallocated-bar"
          className="h-3 first:rounded-l-md last:rounded-r-md"
          style={{
            width: `${Math.round(distribution.unallocated * 100)}%`,
            backgroundColor: config.colors.unallocated,
          }}
        />
      )}
    </div>
  );
}
