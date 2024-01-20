import { DateTime } from "luxon";
import {
  CalculatedAssetData,
  ChartData,
  ChartSeriesRow,
  DataPoint,
  PeriodType,
} from "./types";
import { AssetDto } from "../../../util/types";
import { standardDeviation } from "../../../util/math-extended";

// ===========================================
// ============ HELPERS ======================
// ===========================================

const getInvestmentDurationInMonths = (
  investmentDate: DateTime,
  endInvestmentDate: DateTime
): number => {
  const startDate = investmentDate.endOf("month");
  const diff = endInvestmentDate
    .endOf("month")
    .diff(startDate, "months")
    .toObject();

  if (!diff.months) {
    throw new Error("Could not calculate investment duration");
  }

  return Math.round(+diff.months);
};

const calcReturn = (startValue?: number, endValue?: number): number | null => {
  if (endValue && startValue) {
    return endValue / startValue - 1;
  } else {
    return null;
  }
};

export const getPeriodEnd = (
  data: CalculatedAssetData[],
  periodType: PeriodType
): CalculatedAssetData => {
  if (periodType === "actual") {
    return data[data.length - 1];
  }

  return data.reduce((prev, curr) => {
    if (prev.investmentPeriodReturn && curr.investmentPeriodReturn) {
      if (periodType === "worst") {
        return prev.investmentPeriodReturn < curr.investmentPeriodReturn
          ? prev
          : curr;
      }
      return prev.investmentPeriodReturn > curr.investmentPeriodReturn
        ? prev
        : curr;
    } else {
      return curr;
    }
  });
};

// ===========================================
// ============ MAIN CALCULATOR ==============
// ===========================================

export const generateChartSeriesData = (
  numSharesOwned: number,
  initialInvestment: number,
  actualPeriod: CalculatedAssetData[],
  bestPeriod: CalculatedAssetData[],
  worstPeriod: CalculatedAssetData[]
): ChartSeriesRow[] => {
  const series: ChartSeriesRow[] = [];

  const bestPrices: number[] = [];
  const worstPrices: number[] = [];

  for (let i = 0; i < actualPeriod.length; i++) {
    const actual = actualPeriod[i];
    const best = bestPeriod[i];
    const worst = worstPeriod[i];

    // The chart should show the actual date for all series
    const date = actual.date;

    // Since "best" and "worst" prices are derived, start each series at same asset price
    if (i === 0) {
      const price = actual.price;

      const dataPoint = {
        date,
        price,
        value: price * numSharesOwned,
        shares: numSharesOwned,
        gainLoss: 0,
      };

      series.push({
        actual: dataPoint,
        max: { ...dataPoint, date: best.date },
        min: { ...dataPoint, date: worst.date },
      });

      bestPrices.push(price);
      worstPrices.push(price);
    } else {
      const bestReturnForCurrentPeriod = best.monthOverMonthReturn || 0;
      const worstReturnForCurrentPeriod = worst.monthOverMonthReturn || 0;
      const priorBestPrice = bestPrices[i - 1];
      const priorWorstPrice = worstPrices[i - 1];

      const derivedBestAssetPrice =
        (1 + bestReturnForCurrentPeriod) * priorBestPrice;
      const derivedWorstAssetPrice =
        (1 + worstReturnForCurrentPeriod) * priorWorstPrice;

      const sharedParams: [number, number] = [
        numSharesOwned,
        initialInvestment,
      ];

      series.push({
        actual: getChartSeriesValue(actual.price, actual.date, ...sharedParams),
        max: getChartSeriesValue(
          derivedBestAssetPrice,
          best.date,
          ...sharedParams
        ),
        min: getChartSeriesValue(
          derivedWorstAssetPrice,
          worst.date,
          ...sharedParams
        ),
      });

      bestPrices.push(derivedBestAssetPrice);
      worstPrices.push(derivedWorstAssetPrice);
    }
  }

  return series;
};

export const getChartSeriesValue = (
  price: number,
  date: DateTime,
  sharesOwned: number,
  initialInvestment: number
): DataPoint => {
  const investmentValue = price * sharesOwned;

  return {
    date,
    shares: sharesOwned,
    price,
    value: investmentValue,
    gainLoss: investmentValue - initialInvestment,
  };
};

export const getInvestmentPeriod = (
  data: CalculatedAssetData[],
  investmentDurationMonths: number,
  periodType: PeriodType
): CalculatedAssetData[] => {
  const periodEnd = getPeriodEnd(data, periodType);
  const periodStart = data[periodEnd.index - investmentDurationMonths];

  if (!periodEnd || !periodStart) {
    throw new Error("Unable to calculate investment period");
  }

  return data.slice(periodStart.index, periodEnd.index + 1);
};

export const transformDataWithReturnCalculations = (
  data: AssetDto,
  investmentDurationMonths: number
): CalculatedAssetData[] => {
  const transformedRows: CalculatedAssetData[] = [];

  const rows = data.rows;

  /**
   * This will help us determine the min/max return periods
   *
   * Example:
   *
   * If the user made an investment 2 years ago, we want to find all of the
   * 2 year returns in history and then find the min/max of these returns
   */

  for (let i = 0; i < rows.length; i++) {
    const priorPeriodPrice = i > 0 ? rows[i - 1].close : undefined;
    const currentPrice = rows[i].close;

    const priorInvestmentPeriodPrice =
      i >= investmentDurationMonths
        ? rows[i - investmentDurationMonths].close
        : undefined;

    const date = DateTime.fromFormat(rows[i].date, "yyyy-MM-dd").endOf("month");
    const monthOverMonthReturn = calcReturn(priorPeriodPrice, currentPrice);

    const investmentPeriodReturn = calcReturn(
      priorInvestmentPeriodPrice,
      currentPrice
    );

    transformedRows.push({
      index: i,
      price: currentPrice,
      date,
      monthOverMonthReturn,
      investmentPeriodReturn,
    });
  }

  return transformedRows;
};

// ===========================================
// ================ API ======================
// ===========================================

export const getChartData = (
  data: AssetDto,
  initialInvestment: number,
  investmentDate: DateTime,
  endInvestmentDate: DateTime
): ChartData => {
  const investmentDurationMonths = getInvestmentDurationInMonths(
    investmentDate,
    endInvestmentDate
  );

  const calculatedAssetData = transformDataWithReturnCalculations(
    data,
    investmentDurationMonths
  );

  const sharedParams: [CalculatedAssetData[], number] = [
    calculatedAssetData,
    investmentDurationMonths,
  ];

  // Investment period should be the same for all scenarios
  const actualPeriod = getInvestmentPeriod(...sharedParams, "actual");

  // Leaving these here in case this is requirement in future
  // const bestPeriod = getInvestmentPeriod(...sharedParams, "best");
  // const worstPeriod = getInvestmentPeriod(...sharedParams, "worst");

  const numSharesOwned = initialInvestment / actualPeriod[0].price;

  const series = generateChartSeriesData(
    numSharesOwned,
    initialInvestment,
    actualPeriod,
    actualPeriod, // Previously, we showed a "best case" scenario here (leaving structure in case future requirements change)
    actualPeriod // Previously, we showed a "worst case" scenario here (leaving structure in case future requirements change)
  );

  const endInvestmentValue = series[series.length - 1].actual.value;

  return {
    oppCostMultiple: endInvestmentValue / initialInvestment,
    initialInvestment: initialInvestment,
    currentInvestmentValue: endInvestmentValue,
    series,
  };
};

const getMonthlyPriceChange = (
  startPrice: number,
  growthFactor: number,
  periods: number
): number => {
  return ((1 + growthFactor) * startPrice - startPrice) / periods;
};

export const getForecastedChartData = (
  data: AssetDto,
  initialInvestment: number,
  investmentDate: DateTime,
  forecastPeriodInMonths: number,
  zValue = 1.28 // default to 80% confidence interval, which is roughly equivalent to 1.28 (no need to be overly precise here)
): ChartData => {
  const investmentDurationMonths = getInvestmentDurationInMonths(
    investmentDate,
    DateTime.now()
  );

  const actualsAssetData = transformDataWithReturnCalculations(
    data,
    investmentDurationMonths
  );

  const forecastedAssetData = transformDataWithReturnCalculations(
    data,
    forecastPeriodInMonths
  );

  // If forecast duration is 1 year, this shows all the 1 year returns in history
  const dataWithValidReturns = forecastedAssetData.filter(
    (d) => d.investmentPeriodReturn
  );

  // If forecast duration is 1 year, take a 1 year average of the 1 year returns (moving average methodology)
  const returnsForMovingAverage = dataWithValidReturns.slice(
    forecastPeriodInMonths * -1
  );

  const forecastReturns = returnsForMovingAverage.map(
    (d: CalculatedAssetData) => d.investmentPeriodReturn || 0
  );

  const totalReturns = forecastReturns.reduce((a, b) => a + b);

  const forecastAvgReturn = totalReturns / returnsForMovingAverage.length;
  const stdevForecast = standardDeviation(forecastReturns);

  const confidenceInterval =
    (zValue * stdevForecast) / Math.sqrt(forecastReturns.length);

  const maxReturn = forecastAvgReturn + confidenceInterval;
  const minReturn = forecastAvgReturn - confidenceInterval;

  const actualPeriod = getInvestmentPeriod(
    actualsAssetData,
    investmentDurationMonths,
    "actual"
  );

  // The last value of the actuals period is the starting value for the forecast
  const forecastStartPrice = actualPeriod[actualPeriod.length - 1].price;

  const monthlyPriceIncreaseAvg = getMonthlyPriceChange(
    forecastStartPrice,
    forecastAvgReturn,
    forecastPeriodInMonths
  );

  const monthlyPriceIncreaseMax = getMonthlyPriceChange(
    forecastStartPrice,
    maxReturn,
    forecastPeriodInMonths
  );

  const monthlyPriceIncreaseMin = getMonthlyPriceChange(
    forecastStartPrice,
    minReturn,
    forecastPeriodInMonths
  );

  const forecastRows: ChartSeriesRow[] = [];

  const numSharesOwned = initialInvestment / actualPeriod[0].price;

  for (let i = 0; i < forecastPeriodInMonths; i++) {
    const avgPrice =
      i === 0
        ? forecastStartPrice + monthlyPriceIncreaseAvg
        : forecastRows[i - 1].actual.price + monthlyPriceIncreaseAvg;
    const maxPrice =
      i === 0
        ? forecastStartPrice + monthlyPriceIncreaseMax
        : forecastRows[i - 1].max.price + monthlyPriceIncreaseMax;
    const minPrice =
      i === 0
        ? forecastStartPrice + monthlyPriceIncreaseMin
        : forecastRows[i - 1].min.price + monthlyPriceIncreaseMin;

    const avgValue = avgPrice * numSharesOwned;
    const maxValue = maxPrice * numSharesOwned;
    const minValue = minPrice * numSharesOwned;

    const avgGainLoss = avgValue - initialInvestment;
    const maxGainLoss = maxValue - initialInvestment;
    const minGainLoss = minValue - initialInvestment;

    const date =
      i === 0
        ? actualPeriod[actualPeriod.length - 1].date
            .plus({ months: 1 })
            .endOf("month")
        : forecastRows[i - 1].actual.date.plus({ months: 1 }).endOf("month");

    forecastRows.push({
      actual: {
        date,
        price: avgPrice,
        value: avgValue,
        shares: numSharesOwned,
        gainLoss: avgGainLoss,
      },
      min: {
        date,
        price: minPrice,
        value: minValue,
        shares: numSharesOwned,
        gainLoss: minGainLoss,
      },
      max: {
        date,
        price: maxPrice,
        value: maxValue,
        shares: numSharesOwned,
        gainLoss: maxGainLoss,
      },
    });
  }

  // If displaying a forecast, the actuals portion of the graph will show a single line
  const series = generateChartSeriesData(
    numSharesOwned,
    initialInvestment,
    actualPeriod,
    actualPeriod,
    actualPeriod
  );

  const endInvestmentValue = forecastRows[forecastRows.length - 1].actual.value;

  return {
    oppCostMultiple: endInvestmentValue / initialInvestment,
    initialInvestment: initialInvestment,
    currentInvestmentValue: endInvestmentValue,
    series: series.concat(forecastRows),
    forecastAvgReturn,
  };
};
