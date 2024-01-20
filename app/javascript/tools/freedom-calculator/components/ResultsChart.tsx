import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar, BarRounded } from "@visx/shape";

export type ResultsChartProps = {
  months: { month: number; startingAmount: number; endingAmount: number }[];
};

function ResultsChart({ months }: ResultsChartProps): JSX.Element {
  const reducedData = useMemo(() => {
    // If under 10 years, don't reduce
    if (months.length <= 120) return months;

    const result = [];
    for (let i = 0; i < months.length; i += 12) {
      const periodEndIndex = Math.min(i + 11, months.length - 1);
      result.push({
        month: months[periodEndIndex].month,
        startingAmount: months[i].startingAmount,
        endingAmount: months[periodEndIndex].endingAmount,
      });
    }

    return result;
  }, [months]);

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Unset hoveredBarIndex when chart changes
  useEffect(() => {
    setHoveredBarIndex(null);
  }, [months]);

  const middleIndex = useMemo(
    () => Math.floor(reducedData.length / 2),
    [reducedData]
  );

  const endIndex = useMemo(() => reducedData.length - 1, [reducedData]);

  const getDate = useCallback(
    (index) => {
      const date = new Date();
      date.setMonth(date.getMonth() + reducedData[index].month);
      return date;
    },
    [reducedData]
  );

  const middleDate = useMemo(() => getDate(middleIndex), [reducedData]);

  const lastDate = useMemo(() => getDate(endIndex), [reducedData]);

  return (
    <ParentSize>
      {({ width }) => {
        const xScale = useMemo(
          () =>
            scaleBand<number>({
              range: [0, width],
              round: true,
              domain: reducedData.map(({ month }) => month),
              padding: 0.5,
            }),
          [reducedData, width]
        );

        // Width of the individual bars
        const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);

        return (
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-grow">
              <ParentSize className="flex-grow">
                {({ height }) => {
                  const yScale = useMemo(() => {
                    const dataValues = reducedData
                      .map(({ startingAmount }) => startingAmount)
                      .flat();

                    return scaleLinear<number>({
                      range: [
                        height, // Minimum of 0% height
                        0, // Maximum of 100% height
                      ],
                      round: false,
                      domain: [0, Math.max(...dataValues)],
                    });
                  }, [reducedData, height]);

                  return (
                    <svg width={width} height={height} className="max-w-full">
                      <defs>
                        <linearGradient
                          id="BarGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                          className="text-blue"
                        >
                          <stop
                            offset="0%"
                            style={{
                              stopColor: "currentcolor",
                              stopOpacity: 1,
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "currentcolor",
                              stopOpacity: 0.5,
                            }}
                          />
                        </linearGradient>
                      </defs>
                      <Group>
                        {reducedData.map(
                          ({ month, startingAmount, endingAmount }, index) => {
                            const x = xScale(month) || 0;
                            const startingHeight =
                              height - yScale(startingAmount) || 0;
                            const endingHeight =
                              height - yScale(endingAmount) || 0;

                            return (
                              <Group
                                key={month}
                                onMouseEnter={() => setHoveredBarIndex(index)}
                                onMouseLeave={() =>
                                  hoveredBarIndex === index &&
                                  setHoveredBarIndex(null)
                                }
                                className={classNames(
                                  hoveredBarIndex !== null &&
                                    hoveredBarIndex !== index &&
                                    "opacity-50"
                                )}
                              >
                                {/* Padding-filling bar for hovering*/}
                                <Bar
                                  x={x - barWidth / 2}
                                  y={height - startingHeight}
                                  width={barWidth * 2}
                                  height={startingHeight}
                                  fill="transparent"
                                />

                                {/* Savings decrease bar */}
                                <BarRounded
                                  className="fill-current text-red"
                                  x={x}
                                  y={height - startingHeight}
                                  width={barWidth}
                                  height={startingHeight - endingHeight}
                                  radius={3}
                                  top={true}
                                />

                                {/* Remaining savings bar */}
                                <BarRounded
                                  x={x}
                                  y={height - endingHeight}
                                  width={barWidth}
                                  height={endingHeight}
                                  radius={3}
                                  bottom={true}
                                  fill="url(#BarGradient)"
                                />
                              </Group>
                            );
                          }
                        )}
                      </Group>
                    </svg>
                  );
                }}
              </ParentSize>
            </div>
            <div className="relative mt-4 text-sm whitespace-nowrap">
              {/* First month */}
              <span
                className="absolute transform -translate-x-1/2"
                style={{
                  left:
                    (xScale(reducedData[0].month) || 0) +
                    xScale.bandwidth() / 2,
                }}
              >
                Today
              </span>

              {/* Middle month */}
              {reducedData.length > 2 && (
                <span
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left:
                      (xScale(reducedData[middleIndex].month) || 0) +
                      xScale.bandwidth() / 2,
                  }}
                >
                  {middleDate.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}

              {/* Last month */}
              {reducedData.length > 1 && (
                <span
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left:
                      (xScale(reducedData[endIndex].month) || 0) +
                      xScale.bandwidth() / 2,
                  }}
                >
                  {lastDate.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}

              {/* Hover tooltip */}
              <div
                className={classNames(
                  hoveredBarIndex === null && "invisible",
                  "relative inline-block w-auto py-1 px-4",
                  "transform -translate-x-1/2",
                  "font-semibold text-center text-white bg-blue rounded"
                )}
                style={{
                  left:
                    hoveredBarIndex !== null &&
                    hoveredBarIndex < reducedData.length
                      ? (xScale(reducedData[hoveredBarIndex].month) || 0) +
                        xScale.bandwidth() / 2
                      : 0,
                }}
              >
                <span className="block opacity-60">
                  {hoveredBarIndex !== null &&
                  hoveredBarIndex < reducedData.length
                    ? getDate(hoveredBarIndex).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })
                    : "0"}
                </span>
                <span className="block">
                  $
                  {hoveredBarIndex !== null &&
                    hoveredBarIndex < reducedData.length &&
                    reducedData[hoveredBarIndex].endingAmount.toLocaleString(
                      "default",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center pt-1 text-sm text-gray-200">
              <div className="mr-4">
                <span className="inline-block leading-3 w-1.5 mr-2 rounded-md bg-blue">
                  &nbsp;
                </span>
                Savings remaining
              </div>
              <div>
                <span className="inline-block leading-3 w-1.5 mr-2 rounded-md bg-red">
                  &nbsp;
                </span>
                Money spent
              </div>
            </div>
          </div>
        );
      }}
    </ParentSize>
  );
}

export default React.memo(ResultsChart);
