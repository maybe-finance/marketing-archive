import React, { useMemo, useCallback } from "react";
import classNames from "classnames";
import numeral from "numeral";
import { DateTime } from "luxon";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisRight } from "@visx/axis";
import { Group } from "@visx/group";
import { LinePath, Line } from "@visx/shape";
import { GridRows } from "@visx/grid";
import { localPoint } from "@visx/event";
import { Tooltip, useTooltip } from "@visx/tooltip";
import { NumberValue } from "d3-scale";
import { FundType, RiskLevel, fundColors, FundState } from "./config";
import { useMediaQuery } from "../../hooks";

export type ChartData = {
  fundState: FundState;
  investedAmount: number;
  percentageReturn: number;
  value: number;
  rows: ChartDataRow[];
  availableDataDates: ChartDataAvailableDataDates;
  riskLevel: RiskLevel;
  downsideDeviation: number;
  maximumDrawdownValue: number;
  maximumDrawdownPercentage: number;
};

export type ChartDataRow = {
  date: DateTime;
  funds: {
    [key in FundType]?: number;
  };
  value: number;
};

export type ChartDataAvailableDataDates = {
  [key in FundType]?: {
    from: DateTime;
    to: DateTime;
  };
};

interface ResultsChartProps {
  width: number;
  chartData: ChartData;
}

const margin = { top: 8, right: 48, bottom: 8, left: 8 };

const heightByScreen = {
  lg: 580,
  md: 460,
  sm: 360,
  default: 280,
};

export default function Results({
  width,
  chartData,
}: ResultsChartProps): JSX.Element {
  const mediaQueries = {
    lg: useMediaQuery("lg"),
    md: useMediaQuery("md"),
    sm: useMediaQuery("sm"),
  };

  const height = useMemo(
    () =>
      Object.entries(heightByScreen).find(
        ([screen]) => mediaQueries[screen as keyof typeof mediaQueries] ?? false
      )?.[1] ?? heightByScreen.default,
    [mediaQueries]
  );

  const innerSize = useMemo(
    () => ({
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom,
    }),
    [width, height]
  );

  const timeScale = useMemo(
    () =>
      scaleTime<number>({
        domain: [
          chartData.rows[0].date.valueOf(),
          chartData.rows[chartData.rows.length - 1].date.valueOf(),
        ],
        range: [0, innerSize.width],
      }),
    [chartData, innerSize.width]
  );

  const valueScale = useMemo(() => {
    const allValues = chartData.rows.flatMap((row) => [
      row.value,
      ...Object.values(row.funds),
    ]);
    return scaleLinear<number>({
      domain: [Math.min(...allValues), Math.max(...allValues)],
      range: [innerSize.height, 0],
      nice: true,
    });
  }, [chartData, innerSize.height]);

  const formatValue = useCallback(
    (value: number | NumberValue) =>
      numeral(value)
        .format(value >= 1000000 ? "($0.0a)" : "($0a)")
        .toUpperCase(),
    []
  );

  const funds = useMemo(
    () =>
      Object.values(FundType)
        .map((fundType) => ({
          type: fundType,
          state: chartData.fundState[fundType],
        }))
        .filter((fund) => fund.state.allocationPercentage > 0),
    [chartData]
  );

  const startMonth = chartData.rows[0].date.toFormat("MMMM yyyy");

  const {
    showTooltip,
    hideTooltip,
    tooltipLeft,
    tooltipData: tooltipRow,
  } = useTooltip<ChartDataRow>();

  // Calculate where the tooltip should be displayed when the user moves the pointer (mouse or touch)
  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const point = localPoint(event);
      const x = point?.x ?? null;

      // Don't show anything until the mouse is over the actual chart
      if (!x || x < margin.left || x > width - margin.right) {
        hideTooltip();
        return;
      }

      // Get the date at the specified `x` coordinate, then round to the nearest month end
      const dateValue = DateTime.fromJSDate(timeScale.invert(x - margin.left));
      const targetDate = (
        dateValue.day > 20 ? dateValue : dateValue.minus({ months: 1 })
      ).endOf("month");

      // Get the row for that date and show the tooltip
      const row = chartData.rows.find(
        (row) => row.date.valueOf() === targetDate.valueOf()
      );
      if (row === undefined) {
        hideTooltip();
        return;
      }
      showTooltip({
        tooltipLeft: timeScale(row.date) + margin.left,
        tooltipData: row,
      });
    },
    [width, chartData, showTooltip, hideTooltip]
  );

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Chart showing the value of your hypothetical portfolio from ${startMonth} to today`}
        style={{ touchAction: "none" }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => hideTooltip()}
      >
        <AxisRight
          left={width - margin.right}
          top={margin.top}
          scale={valueScale}
          numTicks={6}
          hideTicks={true}
          hideAxisLine={true}
          tickFormat={formatValue}
          tickLabelProps={() => ({
            className: "fill-gray-500 text-left text-xs pointer-events-none",
            dx: "0.25em",
            dy: "0.25em",
          })}
        />
        <Group
          left={margin.left}
          top={margin.top}
          width={innerSize.width}
          height={innerSize.height}
        >
          <GridRows
            width={innerSize.width}
            className="stroke-gray-700"
            scale={valueScale}
            stroke="" // If removed, will not inherit stroke color properly
            strokeDasharray="2 7"
            numTicks={
              mediaQueries.lg
                ? 16
                : mediaQueries.md
                ? 13
                : mediaQueries.sm
                ? 11
                : 8
            }
          />
          {funds.map((fund) => (
            <LinePath
              key={fund.type}
              className={classNames("stroke-2", fundColors[fund.type].stroke)}
              strokeLinejoin="round"
              strokeDasharray="1 4"
              data={chartData.rows.filter(
                (row) => row.funds[fund.type] !== undefined
              )}
              x={(row) => timeScale(row.date.valueOf())}
              y={(row) => valueScale(row.funds[fund.type] ?? 0)}
            />
          ))}
          <LinePath
            className="stroke-3 sm:stroke-4 stroke-red"
            strokeLinejoin="round"
            data={chartData.rows}
            x={(row) => timeScale(row.date.valueOf())}
            y={(row) => valueScale(row.value)}
          />
        </Group>
        {tooltipRow && (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: height - margin.bottom }}
              className="stroke-10 stroke-white opacity-5"
            />
            {funds.map(
              (fund) =>
                tooltipRow.funds[fund.type] !== undefined && (
                  <circle
                    key={fund.type}
                    cx={tooltipLeft}
                    cy={
                      valueScale(tooltipRow.funds[fund.type] ?? 0) + margin.top
                    }
                    r={6}
                    className={classNames(
                      "stroke-2 stroke-black",
                      fundColors[fund.type].fill
                    )}
                  />
                )
            )}
            <circle
              cx={tooltipLeft}
              cy={valueScale(tooltipRow.value) + margin.top}
              r={6}
              className="stroke-2 stroke-black fill-red"
            />
          </Group>
        )}
      </svg>

      {tooltipRow && tooltipLeft !== undefined && (
        <Tooltip
          className={classNames(
            "z-10 absolute top-0 mt-3 w-max min-w-34 px-3 py-2 rounded-md bg-gray-900 pointer-events-none transform -translate-y-full",
            tooltipLeft < 40
              ? "-translate-x-1/4 sm:-translate-x-1/2"
              : "-translate-x-1/2"
          )}
          style={{
            left: tooltipLeft,
          }}
        >
          <div className="font-bold text-sm">
            <div className="text-center text-gray-100">
              {tooltipRow.date.toFormat("MMMM yyyy")}
            </div>
            <div className="mt-1 flex flex-col">
              {funds.map(
                (fund) =>
                  tooltipRow.funds[fund.type] !== undefined && (
                    <div
                      key={fund.type}
                      className="flex justify-between items-center"
                    >
                      <div
                        className={classNames(
                          "mr-2.5 flex-none w-1 h-2.5 rounded-full",
                          fundColors[fund.type].bg
                        )}
                      />
                      <div>
                        {numeral(tooltipRow.funds[fund.type]).format("$0,0")}
                      </div>
                    </div>
                  )
              )}
              <div className="mt-1 flex justify-between items-center">
                <div className="mr-2.5 flex-none w-1 h-2.5 rounded-full bg-red" />
                <div>{numeral(tooltipRow.value).format("$0,0")}</div>
              </div>
            </div>
          </div>
        </Tooltip>
      )}

      <div
        className="absolute p-1 rounded bg-red font-semibold text-xs leading-none pointer-events-none"
        style={{
          top: valueScale(chartData.value) + margin.top - 10,
          left: width - margin.right + 7,
        }}
        aria-hidden="true"
      >
        {formatValue(chartData.value)}
      </div>

      <div className="mt-3 flex pr-12 text-sm sm:text-base" aria-hidden="true">
        <div className="w-1/2 text-left">{startMonth}</div>
        <div className="w-1/2 text-right">Today</div>
      </div>

      <ul
        className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-200 text-sm"
        aria-hidden="true"
      >
        {funds.map((fund) => (
          <li key={fund.type} className="flex items-center min-w-0">
            <div
              className={classNames(
                "mr-2.5 flex-none w-1 h-2.5 rounded-full",
                fundColors[fund.type].bg
              )}
            />
            <div className="truncate min-w-0">
              {fund.state.fund.label ?? fund.state.fund.value}
            </div>
          </li>
        ))}
        <li className="flex items-center min-w-0">
          <div className="mr-2.5 flex-none w-1 h-2.5 rounded-full bg-red" />
          <div className="truncate min-w-0">Portfolio Value</div>
        </li>
      </ul>
    </div>
  );
}
