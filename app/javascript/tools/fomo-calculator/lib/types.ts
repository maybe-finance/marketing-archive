import { DateTime } from "luxon";

export interface CalculatedAssetData {
  index: number;
  price: number;
  date: DateTime;
  monthOverMonthReturn: number | null;
  investmentPeriodReturn: number | null;
}

export interface DataPoint {
  date: DateTime;
  price: number;
  value: number;
  shares: number;
  gainLoss: number;
}

export interface ChartSeriesRow {
  actual: DataPoint;
  min: DataPoint;
  max: DataPoint;
}

export interface ChartData {
  oppCostMultiple: number;
  initialInvestment: number;
  currentInvestmentValue: number;
  series: ChartSeriesRow[];
  forecastAvgReturn?: number;
}

export type PeriodType = "actual" | "best" | "worst";
