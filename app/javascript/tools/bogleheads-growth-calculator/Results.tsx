import React, { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import axios from "axios";
import { DateTime, Interval } from "luxon";
import numeral from "numeral";
import { motion } from "framer-motion";
import { ParentSize } from "@visx/responsive";
import { commaJoin } from "../../util/string";
import { AssetDto } from "../../util/types";
import {
  SPAN_IN_YEARS,
  DOWNSIDE_DEVIATION_TARGET,
  FundType,
  FundState,
  RiskLevel,
  riskLevelConfig,
} from "./config";
import ResultsChart, {
  ChartData,
  ChartDataRow,
  ChartDataAvailableDataDates,
} from "./ResultsChart";
import { QuestionIcon } from "../../components/icons";
import { Tooltip, TooltipVariant } from "../../components/tooltip";

export type FundData = {
  [key in FundType]: AssetDto;
};

const today = DateTime.now();
const minimumDate = today.minus({ years: SPAN_IN_YEARS }).endOf("month");

const getPercentageReturn = (value: number, previousValue: number) => {
  return (value / previousValue - 1) * 100;
};

const getRiskLevel = (downsideDeviation: number) => {
  for (const riskLevel of Object.values(RiskLevel)) {
    const maxDownsideDeviation =
      riskLevelConfig[riskLevel].maxDownsideDeviation;
    if (
      maxDownsideDeviation === null ||
      downsideDeviation <= maxDownsideDeviation
    ) {
      return riskLevel;
    }
  }
  return RiskLevel.HIGH;
};

const getChartData = function (
  fundData: FundData,
  fundState: FundState,
  investedAmount: number
): ChartData {
  const rowsByDate = new Map<number, ChartDataRow>();
  const availableDataDates: ChartDataAvailableDataDates = {};
  let chartFirstDate: DateTime | null = null;
  let chartLastDate: DateTime | null = null;

  const fundTypes = Object.values(FundType).sort((fundTypeA, fundTypeB) => {
    // Loop through fund types sorted by "least historical data" first
    const firstDateA = DateTime.fromFormat(
      fundData[fundTypeA].rows[0].date,
      "yyyy-MM-dd"
    );
    const firstDateB = DateTime.fromFormat(
      fundData[fundTypeB].rows[0].date,
      "yyyy-MM-dd"
    );
    return firstDateA < firstDateB ? 1 : -1;
  });

  for (const fundType of fundTypes) {
    const thisFundData = fundData[fundType];
    const thisFundState = fundState[fundType];
    // Skip this fund if its allocation percentage is 0
    if (thisFundState.allocationPercentage === 0) {
      continue;
    }
    let fundFirstDate: DateTime | null = null;
    let fundLastDate: DateTime | null = null;
    let shares: number | null = null;

    // Loop through this fund's `fundData` rows
    for (const thisFundDataRow of thisFundData.rows) {
      // Get this row's date, rounded to the end of the month
      const date = DateTime.fromFormat(
        thisFundDataRow.date,
        "yyyy-MM-dd"
      ).endOf("month");

      // Determine the first and last dates that this fund has available data for
      if (fundFirstDate === null) {
        fundFirstDate = date;
      }
      fundLastDate = date;

      // If this is the current month and it just started, omit it because other funds may not have data for it yet
      if (today.hasSame(date, "month") && today.day < 4) {
        continue;
      }

      // Skip this row if it's older than the first date of the chart (or, if we haven't determined that yet, the minimum date)
      if (date < (chartFirstDate ?? minimumDate)) {
        continue;
      }

      // If `chartFirstDate` is not set at this point, we're on the first row that respects the minimum date
      // in the first fund, i.e. the one with the least historical data, meaning that all the enabled funds
      // necessarily have data for this date. Make it the `chartFirstDate`.
      if (chartFirstDate === null) {
        chartFirstDate = date;
      }

      // Ensure `chartLastDate` is the most recent date
      if (chartLastDate === null || chartLastDate < date) {
        chartLastDate = date;
      }

      // Try to find this date's row; if it doesn't exist, create it
      let row = rowsByDate.get(date.valueOf());
      if (!row) {
        row = {
          date,
          funds: {},
          value: 0,
        };
        rowsByDate.set(date.valueOf(), row);
      }

      // Calculate and save this fund's value for this row
      if (shares === null) {
        shares =
          (investedAmount * thisFundState.allocationPercentage) /
          100 /
          thisFundDataRow.close;
      }
      const value = Math.floor(shares * thisFundDataRow.close);
      row.funds[fundType] = value;
      row.value += value;
    }

    if (fundFirstDate && fundLastDate) {
      availableDataDates[fundType] = {
        from: fundFirstDate,
        to: fundLastDate,
      };
    }
  }

  if (!chartFirstDate || !chartLastDate) {
    throw "Failed to set chartFirstDate and chartLastDate";
  }

  // Get the rows we generated in the previous loop, sorted by date
  const rows: ChartDataRow[] = [];
  let rowDate = chartFirstDate;
  while (rowDate <= chartLastDate) {
    const row = rowsByDate.get(rowDate.valueOf());
    if (row) {
      rows.push(row);
    }
    rowDate = rowDate.plus({ months: 1 }).endOf("month");
  }

  // Calculate the downside deviation to determine the risk level
  const percentageReturns = rows.map((row, rowIndex, rows) => {
    const previousValue = rows[rowIndex - 1]?.value ?? investedAmount;
    return getPercentageReturn(row.value, previousValue);
  });

  const squaredPercentageReturnsBelowTarget = percentageReturns.map(
    (percentageReturn) => {
      if (percentageReturn < DOWNSIDE_DEVIATION_TARGET) {
        return Math.pow(percentageReturn, 2);
      }
      return 0;
    }
  );

  const sumOfSquaredPercentageReturnsBelowTarget =
    squaredPercentageReturnsBelowTarget.reduce(
      (sum, squaredPercentageReturnBelowTarget) =>
        sum + squaredPercentageReturnBelowTarget,
      0
    );

  const downsideDeviation = Math.sqrt(
    sumOfSquaredPercentageReturnsBelowTarget / rows.length
  );

  const riskLevel = getRiskLevel(downsideDeviation);

  // Calculate the maximum drawdown in dollars
  let lastPeakValue = 0;
  let maximumDrawdownValue = 0;
  let maximumDrawdownPercentage = 0;
  rows.forEach((row) => {
    if (row.value > lastPeakValue) {
      lastPeakValue = row.value;
    }
    if (lastPeakValue - row.value > maximumDrawdownValue) {
      maximumDrawdownValue = lastPeakValue - row.value;
      maximumDrawdownPercentage = (maximumDrawdownValue / lastPeakValue) * 100;
    }
  });

  // Get the chart's final value and overall percentage return
  const value = rows[rows.length - 1].value;
  const percentageReturn = getPercentageReturn(value, investedAmount);

  return {
    fundState,
    investedAmount,
    percentageReturn,
    value,
    rows,
    availableDataDates,
    riskLevel,
    downsideDeviation,
    maximumDrawdownValue,
    maximumDrawdownPercentage,
  };
};

type AssetDtoOrPromise = AssetDto | Promise<AssetDto>;

const cachedAssetDtos: { [key: string]: AssetDtoOrPromise } = {};

interface ResultsProps {
  fundState: FundState;
  investedAmount: number;
  onChartData: (chartData: ChartData) => void;
  onResetFunds: () => void;
}

export default function Results({
  fundState,
  investedAmount,
  onChartData,
  onResetFunds,
}: ResultsProps): JSX.Element {
  const [fundData, setFundData] = useState<FundData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isOverflowHidden, setIsOverflowHidden] = useState(true);

  // Update `fundData`, fetching the new data if it hasn't been fetched before
  useEffect(() => {
    let isCancelled = false;
    const assetDtoPromises: AssetDtoOrPromise[] = [];

    Object.values(fundState).forEach((thisFundState) => {
      const symbol = thisFundState.fund.value;
      if (!cachedAssetDtos[symbol]) {
        cachedAssetDtos[symbol] = axios(
          `/api/equity_prices/${symbol}?interval=month`
        ).then((data) => (cachedAssetDtos[symbol] = data.data));
      }
      assetDtoPromises.push(cachedAssetDtos[symbol]);
    });

    const fundTypes = Object.keys(fundState);

    Promise.all(assetDtoPromises).then((assetDtos) => {
      if (isCancelled) return;
      const newFundData = Object.fromEntries(
        assetDtos.map((assetDto, index) => [fundTypes[index], assetDto])
      );
      setFundData(newFundData as FundData);
    });

    return () => {
      isCancelled = true;
    };
  }, [
    fundState.stock.fund,
    fundState.internationalStock.fund,
    fundState.bond.fund,
  ]);

  // Update `chartData`
  useEffect(() => {
    let finished = false;
    if (fundData === null) {
      setChartData(null);
      return;
    }
    setIsCalculating(true);
    const newChartData = getChartData(fundData, fundState, investedAmount);
    const setChartDataTimeout = setTimeout(() => {
      setIsCalculating(false);
      setChartData(newChartData);
      onChartData(newChartData);
      finished = true;
    }, 1000);
    return () => {
      if (finished) return;
      clearTimeout(setChartDataTimeout);
    };
  }, [
    fundData,
    fundState.stock.submittedAllocationPercentage,
    fundState.internationalStock.submittedAllocationPercentage,
    fundState.bond.submittedAllocationPercentage,
    investedAmount,
  ]);

  const insufficentDataFunds = useMemo(() => {
    if (!chartData) {
      return [];
    }
    return Object.values(FundType).filter((fundType) => {
      const availableDataDates = chartData.availableDataDates[fundType];
      if (!availableDataDates) {
        return false;
      }
      return availableDataDates.from > minimumDate;
    });
  }, [chartData]);

  const chartIntervalInYears = useMemo(() => {
    if (!chartData) {
      return null;
    }
    const interval = Interval.fromDateTimes(
      chartData.rows[0].date,
      chartData.rows[chartData.rows.length - 1].date
    ).length("years");
    const precision = interval > SPAN_IN_YEARS - 1 ? 10 : 1;
    return Math.floor(interval * precision) / precision;
  }, [chartData]);

  return (
    <motion.div
      layout={true}
      className={classNames(
        "isolate relative px-2 sm:px-4 md:px-14 py-10 rounded-lg bg-black",
        isOverflowHidden ? "overflow-hidden" : ""
      )}
    >
      {!chartData ? (
        <motion.div
          key="calculating"
          layout={true}
          className="flex justify-center items-center py-10"
        >
          <p className="font-display font-extrabold text-xl md:text-2xl leading-heading">
            Calculating...
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="chart"
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={() => setIsOverflowHidden(false)}
        >
          <div
            className={classNames(
              "z-10 absolute inset-0 flex justify-center items-center rounded-lg bg-black bg-opacity-80 transition-opacity duration-500",
              isCalculating ? "opacity-100" : "opacity-0 invisible"
            )}
          >
            <p className="font-display font-extrabold text-xl md:text-2xl leading-heading">
              Calculating...
            </p>
          </div>
          {insufficentDataFunds.length > 0 && (
            <div className="mb-8 -mt-4 mx-4 md:mt-0 md:mx-0 p-3 sm:p-4 rounded border border-gray-500 bg-gray-900 text-center text-sm sm:text-base">
              There’s less than {SPAN_IN_YEARS} years of data available for{" "}
              {commaJoin(
                insufficentDataFunds.map(
                  (fundType) =>
                    `${
                      chartData.fundState[fundType].fund.value
                    } (${chartData.availableDataDates[fundType]?.from.toFormat(
                      "MMM yyyy"
                    )} - ${chartData.availableDataDates[fundType]?.to.toFormat(
                      "MMM yyyy"
                    )})`
                )
              )}
              , so these results are for the last {chartIntervalInYears} years.
              To ensure the chart spans a whole 20 years, select mutual funds
              from the{" "}
              <a
                href="#"
                role="button"
                className="inline text-gray-300 hover:underline active:no-underline"
                onClick={(e) => {
                  e.preventDefault();
                  onResetFunds?.();
                }}
              >
                Vanguard Investor Share class (VTSMX, VGTSX, and VBMFX)
              </a>
              .
            </div>
          )}
          <dl className="flex flex-col md:flex-row flex-wrap gap-y-8">
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <dt className="mb-3 text-gray-100 text-base md:text-lg">
                Invested
              </dt>
              <dd className="font-display font-extrabold text-2xl leading-heading truncate">
                {numeral(chartData.investedAmount).format("$0,0")}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-right lg:text-left">
              <dt className="mb-3 text-gray-100 text-base md:text-lg">
                Returns
              </dt>
              <dd className="font-display font-extrabold text-2xl leading-heading truncate">
                {numeral(chartData.percentageReturn / 100).format("+0.0%")}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <dt className="mb-3 text-gray-100 text-base md:text-lg">
                Risk Level
                <Tooltip
                  content={
                    <div className="p-1 pb-2 font-semibold pointer-events-auto">
                      <p>
                        We use downside risk to determine the riskiness of a
                        portfolio strategy.
                      </p>
                      <dl className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex justify-between items-end">
                          <dt className="mr-1">Downside Deviation</dt>
                          <dd
                            className={classNames(
                              "text-right whitespace-nowrap",
                              riskLevelConfig[chartData.riskLevel].color
                            )}
                          >
                            {numeral(chartData.downsideDeviation / 100).format(
                              "0.00%"
                            )}
                          </dd>
                        </div>
                        <div className="mt-1 flex justify-between items-end">
                          <dt className="mr-1">Maximum Drawdown</dt>
                          <dd
                            className={classNames(
                              "text-right whitespace-nowrap",
                              riskLevelConfig[chartData.riskLevel].color
                            )}
                          >
                            {numeral(chartData.maximumDrawdownValue).format(
                              "$0,0"
                            )}{" "}
                            (
                            {numeral(
                              chartData.maximumDrawdownPercentage / 100
                            ).format("0%")}
                            )
                          </dd>
                        </div>
                      </dl>
                    </div>
                  }
                  variant={TooltipVariant.Gray}
                  showOnClick={true}
                  placement="bottom-start"
                  offset={[4, 8]}
                  className="max-w-70"
                >
                  <span
                    tabIndex={0}
                    className="ml-1 -mr-1 -mt-0.5 -mb-1 w-7 h-7 inline-flex align-top justify-center items-center"
                  >
                    <QuestionIcon size={20} />
                  </span>
                </Tooltip>
              </dt>
              <dd
                className={classNames(
                  "font-display font-extrabold text-2xl leading-heading truncate",
                  riskLevelConfig[chartData.riskLevel].color
                )}
              >
                {riskLevelConfig[chartData.riskLevel].label}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-right text-red">
              <dt className="mb-3 text-gray-100 text-base md:text-lg">
                Portfolio Value
              </dt>
              <dd className="font-display font-extrabold text-2xl leading-heading truncate">
                {numeral(chartData.value).format("$0,0")}
              </dd>
            </div>
          </dl>
          <div className="mt-12">
            <ParentSize>
              {({ width }) => (
                <ResultsChart width={width} chartData={chartData} />
              )}
            </ParentSize>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
