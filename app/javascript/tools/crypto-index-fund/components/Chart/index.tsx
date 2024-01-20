import React from "react";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { ParentSize } from "@visx/responsive";
import { motion, AnimatePresence } from "framer-motion";

import type {
  ChartData,
  Currency,
  Period,
  Returns,
  WeightingStrategy,
} from "../../types";

const padding = 12;
const height = 200;

const colors = {
  black: "#1f1e24",
  darkBlack: "#1d1c21",
  green: "#38D9A9",
  red: "#f28b82",
  gray: "#e1e1e6",
};

interface ChartProps {
  data: ChartData;
  returns: Returns;
  period: Period;
  weighting: WeightingStrategy;
  currencies: Currency[];
}

const Chart = ({
  data,
  returns,
  period,
  weighting,
  currencies,
}: ChartProps): JSX.Element => {
  const xScale = (width: number) =>
    scaleLinear({
      domain: [1, data.length],
      range: [0, width],
    });

  const yScale = scaleLinear({
    domain: [
      Math.min(...data.map(([, y]) => y)),
      Math.max(...data.map(([, y]) => y)),
    ],
    range: [height - padding, padding],
  });

  const color = (neutralColor = colors.gray) => {
    if (returns.isPositive) {
      return colors.green;
    }

    if (returns.isNegative) {
      return colors.red;
    }

    return neutralColor;
  };

  return (
    <ParentSize>
      {({ width }) => (
        <svg height={height} width={width}>
          <LinePath
            data={data}
            x={(d) => xScale(width)(d[0])}
            y={(d) => yScale(d[1])}
            strokeWidth={2}
            stroke={color()}
            strokeOpacity={0.3}
            data-testid="line"
          />

          <AnimatePresence>
            <motion.rect
              key={`rect-1-${period}-${data.length}-${weighting}-${currencies
                .map((currency) => currency.symbol)
                .join("-")}`}
              y={0}
              width={width}
              height={height}
              rx={5}
              style={{
                fill: "url('#background-gradient-black')",
              }}
              animate={{ x: width }}
              initial={{ x: 0 }}
              exit={{ x: width }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <motion.rect
              key={`rect-2-${period}-${data.length}-${weighting}-${
                currencies.map((currency) => currency.symbol).join
              }`}
              x={0}
              y={0}
              width={width}
              height={height}
              style={{
                fill: "url('#background-gradient')",
              }}
              rx={5}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          </AnimatePresence>

          <LinearGradient
            id="background-gradient"
            from={color(colors.black)}
            to={colors.black}
            fromOpacity={0.05}
            toOpacity={0.05}
          />

          <LinearGradient
            id="background-gradient-black"
            from={colors.black}
            to={colors.darkBlack}
          />
        </svg>
      )}
    </ParentSize>
  );
};

export default Chart;
