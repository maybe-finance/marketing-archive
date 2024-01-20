import React, { useCallback, useMemo } from "react";
import { LinePath, AreaClosed, Line } from "@visx/shape";
import { LinearGradient, RadialGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { AxisBottom } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { Result } from "../types";

type ChartProps = {
  width: number;
  result: Result;
  onYearHover: (year: number | null) => void;
};

const LINES_HEIGHT = 250;
const AXIS_HEIGHT = 25;
const MARGIN = { left: 12, right: 12, top: 12 };
const HEIGHT = LINES_HEIGHT + AXIS_HEIGHT + MARGIN.top;

const getData = (values: number[]) =>
  values.map((value, index) => [index, value]);

export default function Chart({
  width,
  result,
  onYearHover,
}: ChartProps): JSX.Element {
  const totalData = getData(result.total);
  const contributedData = getData(result.contributed);
  const innerWidth = width - MARGIN.left - MARGIN.right;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: [
      Math.min(...totalData.map(([year, value]) => year)),
      Math.max(...totalData.map(([year, value]) => year)),
    ],
  });

  const yScale = scaleLinear({
    range: [LINES_HEIGHT, MARGIN.top],
    domain: [
      Math.min(...totalData.map(([year, value]) => value)),
      Math.max(...totalData.map(([year, value]) => value)),
    ],
    nice: true,
  });

  const { showTooltip, hideTooltip, tooltipLeft, tooltipData } = useTooltip();

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const { x } = localPoint(event) || {};

      if (x === undefined) {
        hideTooltip();
        onYearHover(null);
        return;
      }

      const x0 = Math.round(xScale.invert(x - MARGIN.left));
      onYearHover(x0);

      showTooltip({
        tooltipLeft: xScale(x0) + MARGIN.left - 5,
        tooltipData: [totalData[x0], contributedData[x0]],
      });
    },
    [totalData, showTooltip, hideTooltip]
  );

  const handlePointerLeave = () => {
    hideTooltip();
    onYearHover(null);
  };

  return (
    <svg
      height={HEIGHT}
      width={width}
      role="img"
      style={{ touchAction: "none" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <AxisBottom
        top={HEIGHT - AXIS_HEIGHT}
        scale={xScale}
        hideAxisLine
        numTicks={Math.min(6, result.total.length - 1)}
        tickFormat={Math.round}
        tickLabelProps={() => ({
          className: "fill-gray-500 text-left text-xs pointer-events-none",
          dx: "0.25em",
          dy: "0.25em",
        })}
      />

      <Group
        left={MARGIN.left}
        top={MARGIN.top}
        width={innerWidth}
        height={LINES_HEIGHT}
      >
        <GridRows
          width={innerWidth}
          className="stroke-gray-700"
          scale={yScale}
          stroke="" // If removed, will not inherit stroke color properly
          strokeDasharray="2 7"
          numTicks={12}
        />

        {/* RED LINE */}
        <LinePath
          data={totalData}
          x={(row) => xScale(row[0])}
          y={(row) => yScale(row[1])}
          strokeWidth={3}
          stroke="#F12980"
        />

        <AreaClosed
          fill="url(#red-gradient)"
          data={totalData}
          yScale={yScale}
          x={(row) => xScale(row[0])}
          y={(row) => yScale(row[1])}
        />

        <RadialGradient
          id="red-gradient"
          from="#F12980"
          to="#1f1e24"
          fromOpacity={0.2}
          toOpacity={0}
          r="80%"
          fx="0%"
          fy="0%"
        />

        {/* WHITE LINE */}
        <LinePath
          data={contributedData}
          x={(row) => xScale(row[0])}
          y={(row) => yScale(row[1])}
          strokeWidth={3}
          stroke="#FFFFFF"
          strokeDasharray="2 7"
        />

        <AreaClosed
          fill="url(#white-gradient)"
          data={contributedData}
          yScale={yScale}
          x={(row) => xScale(row[0])}
          y={(row) => yScale(row[1])}
        />

        <LinearGradient
          id="white-gradient"
          from="#FFFFFF"
          to="#1f1e24"
          fromOpacity={0.4}
          toOpacity={0}
          transform="rotate(-35)"
        />
      </Group>

      {tooltipData && (
        <Group>
          <Line
            from={{ x: tooltipLeft, y: MARGIN.top * 2 }}
            to={{ x: tooltipLeft, y: LINES_HEIGHT + MARGIN.top }}
            className="stroke-10 stroke-white opacity-5"
          />
          <circle
            cx={tooltipLeft}
            cy={yScale(tooltipData[0][1]) + MARGIN.top}
            r={6}
            stroke="#1f1e24"
            fill="#F12980"
            strokeWidth={2}
          />
          <circle
            cx={tooltipLeft}
            cy={yScale(tooltipData[1][1]) + MARGIN.top}
            r={6}
            stroke="#1f1e24"
            fill="#FFFFFF"
            strokeWidth={2}
          />
        </Group>
      )}
    </svg>
  );
}
