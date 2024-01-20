import React, { useCallback, useRef, useState } from "react";
import numeral from "numeral";
import { DateTime } from "luxon";
import { Group } from "@visx/group";
import { curveLinear } from "@visx/curve";
import { Line, LinePath } from "@visx/shape";
import { Threshold } from "@visx/threshold";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisRight } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { localPoint } from "@visx/event";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { NumberValue } from "d3-scale";
import { ChartSeriesRow, ChartData } from "./lib";
import classNames from "classnames";

export interface ResultsLineChartProps {
  width: number;
  height: number;
  chartData: ChartData;
  startDateString: string;
  assetLabel: string;
  isForecastChart: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export default function ResultsLineChart({
  width,
  height,
  chartData,
  startDateString,
  assetLabel,
  isForecastChart = false,
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
}: ResultsLineChartProps): JSX.Element {
  // Bounds of chart
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  let forecastSeries: ChartSeriesRow[] = [];

  const actualSeries = chartData.series.filter(
    (d) => d.actual.date <= DateTime.now().endOf("month")
  );

  if (isForecastChart) {
    forecastSeries = chartData.series.filter(
      (d) => d.actual.date >= DateTime.now().endOf("month")
    );

    // Forecast line should start with last month of actuals (otherwise they will appear disconnected)
    forecastSeries.unshift(actualSeries[actualSeries.length - 1]);
  }

  const lastValue = chartData.series[chartData.series.length - 1].actual.value;
  const dateAccessor = (d: ChartSeriesRow) => d.actual.date.valueOf();
  const tooltipBoxRef = useRef<HTMLDivElement>(null);

  const [tooltipXAdjustment, setTooltipXAdjustment] = useState(100);

  const timeScale = scaleTime<number>({
    range: [0, xMax],
    domain: [
      Math.min(...chartData.series.map(dateAccessor)),
      Math.max(...chartData.series.map(dateAccessor)),
    ],
  });

  const priceScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [
      Math.floor(Math.min(...chartData.series.map((d) => d.min.value)) / 10) *
        10,
      Math.ceil(Math.max(...chartData.series.map((d) => d.max.value)) / 10) *
        10,
    ],
    nice: true,
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = margin.left,
    tooltipTop = margin.top,
  } = useTooltip<ChartSeriesRow>({
    // initial tooltip state
    tooltipOpen: false,
  });

  // Every time the user moves the mouse, recalculate where the tooltip and lines should be displayed
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      // Gives us the x and y coordinates of the specific data point - https://airbnb.io/visx/docs/event
      const lp = localPoint(event);

      if (!lp?.x) {
        hideTooltip();
        return;
      }

      // Don't show anything until the mouse is over the actual graph
      if (lp.x >= margin.left && lp.x <= width - margin.right) {
        const dateValue = DateTime.fromJSDate(
          timeScale.invert(lp.x - margin.left) // Gives us the date at the specified x coordinate - https://observablehq.com/@d3/d3-scaletime#cell-660
        );

        // This is the date we want the mouse to "snap" to as it moves
        const targetDate =
          dateValue.day > 15
            ? dateValue.endOf("month")
            : dateValue.minus({ months: 1 }).endOf("month");

        const targetMonthIndex = chartData.series.findIndex(
          (d) => d.actual.date.toMillis() === targetDate.toMillis()
        );

        if (targetMonthIndex !== -1) {
          const dataPoint = chartData.series[targetMonthIndex];
          const leftOffset = timeScale(targetDate);

          // Sets width of tooltip ref object for alignment purposes
          if (tooltipBoxRef && tooltipBoxRef.current) {
            const halfTooltipWidth = tooltipBoxRef.current.offsetWidth / 2;
            const baseAdjustment = margin.left + 5;

            const availableSpaceLeft = leftOffset;
            const availableSpaceRight = width - leftOffset - margin.right;

            let addon = halfTooltipWidth;

            if (availableSpaceLeft < halfTooltipWidth) {
              addon = availableSpaceLeft;
            }

            if (availableSpaceRight < halfTooltipWidth) {
              addon = (availableSpaceRight - halfTooltipWidth * 2) * -1;
            }

            setTooltipXAdjustment(baseAdjustment + addon);
          }

          showTooltip({
            tooltipLeft: leftOffset + margin.left,
            tooltipTop: priceScale(dataPoint.actual.value) + margin.top,
            tooltipData: dataPoint,
          });
        } else {
          hideTooltip();
        }
      } else {
        hideTooltip();
      }
    },
    [showTooltip, hideTooltip, chartData, width]
  );

  return (
    <>
      <div className="relative">
        <svg
          onPointerMove={handlePointerMove}
          onMouseLeave={() => hideTooltip()}
          width={width}
          height={height}
        >
          <rect
            className="top-0 left-0 text-transparent fill-current"
            width={width}
            height={height}
          />

          <Group left={width - margin.right} top={margin.top}>
            <AxisRight
              scale={priceScale}
              numTicks={5}
              hideTicks
              hideAxisLine
              tickFormat={(price: NumberValue) => {
                return numeral(price).format("($0a)");
              }}
              tickClassName="text-red fill-red-500"
              tickLabelProps={() => ({
                className:
                  "text-gray-500 fill-current text-left text-xs pointer-events-none",
                dx: "0.25em",
                dy: "0.25em",
              })}
            />
          </Group>

          <Group left={margin.left} top={margin.top}>
            <GridRows
              className="text-gray-700 stroke-current"
              scale={priceScale}
              width={xMax}
              height={yMax}
              stroke="" // If removed, will not inherit stroke color properly
              strokeDasharray="2 5"
              numTicks={10}
            />

            <Threshold<ChartSeriesRow>
              className="text-red fill-current opacity-20"
              id={`${Math.random()}`}
              data={isForecastChart ? forecastSeries : actualSeries}
              x={(d) => timeScale(dateAccessor(d)) ?? 0}
              y0={(d) => priceScale(d.min.value) ?? 0}
              y1={(d) => priceScale(d.max.value) ?? 0}
              clipAboveTo={0}
              clipBelowTo={yMax}
              curve={curveLinear}
            />
            <LinePath
              className={classNames("text-red stroke-current stroke-4")}
              data={actualSeries}
              curve={curveLinear}
              x={(d) => timeScale(dateAccessor(d)) ?? 0}
              y={(d) => priceScale(d.actual.value) ?? 0}
            />
            {isForecastChart && forecastSeries.length > 0 && (
              <LinePath
                className={classNames("text-red stroke-current stroke-4")}
                data={forecastSeries}
                curve={curveLinear}
                x={(d) => timeScale(dateAccessor(d)) ?? 0}
                y={(d) => priceScale(d.actual.value) ?? 0}
                strokeDasharray="10 15"
                strokeLinecap="round"
              />
            )}
          </Group>

          {tooltipOpen && (
            <Group>
              <Line
                className="opacity-10 stroke-current stroke-10 pointer-events-none"
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: height - margin.bottom }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={5}
                className="fill-red-500 stroke-gray-900 stroke-1"
                pointerEvents="none"
              />
            </Group>
          )}
        </svg>
        <div>
          {tooltipOpen && tooltipData && (
            <TooltipWithBounds
              key={Math.random()}
              className="absolute p-2 bg-gray-900 pointer-events-none rounded-md whitespace-nowrap z-10"
              style={{
                top: margin.top - 67,
                left: tooltipLeft - tooltipXAdjustment,
              }}
            >
              <div ref={tooltipBoxRef} className="text-sm font-bold">
                <p className="opacity-50">
                  {tooltipData.actual.date.toFormat("MMMM yyyy")}
                </p>
                <div className="flex items-center mt-1 justify-between">
                  <div className="bg-red rounded-sm h-2.5 w-1 mr-1"></div>
                  <p>{numeral(tooltipData.actual.value).format("$0,0")}</p>
                </div>
              </div>
            </TooltipWithBounds>
          )}
        </div>
        {/* Date labels */}
        <div>
          <p
            className="absolute transform -translate-y-8 text-right"
            style={{ right: margin.right }}
          >
            {isForecastChart
              ? forecastSeries[forecastSeries.length - 1].actual.date.toFormat(
                  "MMM yyyy"
                )
              : "Today"}
          </p>
          <p
            className="absolute transform -translate-y-8"
            style={{ left: margin.left }}
          >
            {startDateString}
          </p>
        </div>
        {isForecastChart && actualSeries.length > 2 && window.innerWidth > 600 && (
          <p
            className="absolute transform -translate-y-8 text-center transform -translate-x-2"
            style={{ left: timeScale(DateTime.now().endOf("month")) }}
          >
            Today
          </p>
        )}
        {/* Final value tooltip */}
        <p
          className="absolute text-xs font-semibold bg-red h-5 leading-5 px-1 transform translate-x-2 -translate-y-2.5 rounded"
          style={{
            top: priceScale(lastValue) + margin.top,
            left: width - margin.right,
          }}
        >
          {numeral(lastValue).format("($0a)")}
        </p>
      </div>
      <div
        className={classNames(
          "flex flex-wrap items-center pt-2 text-sm text-gray-200 ml-2",
          isForecastChart ? "ml-2" : "sm:ml-0 sm:justify-center"
        )}
      >
        <div className={classNames("mt-2", isForecastChart ? "mr-8" : "mr-4")}>
          <span className="inline-block leading-3 w-1.5 mr-2 rounded-md bg-red">
            &nbsp;
          </span>
          {assetLabel} value
        </div>

        {isForecastChart && (
          <div className="flex mr-8 mt-2">
            <div className="flex flex-col gap-0.5 items-center justify-center">
              <span className="h-1 w-1.5 rounded-md bg-red"></span>
              <span className="h-1 w-1.5 rounded-md bg-red"></span>
            </div>
            &nbsp; Estimated value
          </div>
        )}

        {isForecastChart && (
          <div className="mr-8 mt-2">
            <span className="inline-block leading-3 w-1.5 mr-2 rounded-md bg-red opacity-30">
              &nbsp;
            </span>
            80% Probability
          </div>
        )}

        {isForecastChart && (
          <p
            className="mt-4 lg:mt-2 lg:ml-auto lg:mr-1"
            style={{ marginRight: margin.right }}
          >
            {`*Estimate based on ${Math.round(
              (forecastSeries.length - 2) / 12
            )} year moving avg. return of ${numeral(
              chartData.forecastAvgReturn ?? 0
            ).format("0%")}`}
          </p>
        )}
      </div>
    </>
  );
}
