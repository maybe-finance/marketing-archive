export type RawCurrency = {
  symbol: string;
  name: string;
  color: string;
};

export type RawFund = {
  name: string;
  symbols: string[];
};

export type Currency = {
  symbol: string;
  logo: string;
  name: string;
  color: string;
  marketCap: number;
  prices: number[]; // prices[0] = most recent price
};

export type WeightingStrategy =
  | "market-cap-weighted"
  | "equally-weighted"
  | "custom";

export type Period = "all-time" | "1y" | "90d" | "30d" | "7d";

export type FormState = {
  amountInvested: number;
  fundName: string;
  weighting: WeightingStrategy;
};

export type Row = {
  currency: Currency;
  weight: number;
  maxWeight: number;
  changeWeight: (weight: number) => void;
  amountInvested: number;
  currencyAmount: number;
};

export type Weights = {
  [key: string]: number;
};

export type ChartData = [number, number][];

export type Returns = {
  returnPercentage: number;
  returnMoney: number;
  startMoney: number;
  endMoney: number;
  isPositive: boolean;
  isNegative: boolean;
  isNeutral: boolean;
};
