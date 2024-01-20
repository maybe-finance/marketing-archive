import { SelectableOption } from "../../components/select";
import { SliderInterpolators } from "../../components/slider";

export enum FundType {
  STOCK = "stock",
  INTERNATIONAL_STOCK = "internationalStock",
  BOND = "bond",
}

export enum RiskLevel {
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
}

export const SPAN_IN_YEARS = 20;
export const MIN_INVESTED_AMOUNT = 100;
export const MAX_INVESTED_AMOUNT = 1000000;
export const DOWNSIDE_DEVIATION_TARGET = 0;
export const GREAT_RESULT_MIN_PERCENTAGE_RETURN = 300;
export const GREAT_RESULT_RISK_LEVELS = [RiskLevel.LOW, RiskLevel.MODERATE];

export type FundOptions = {
  [key in FundType]: SelectableOption[];
};

export const fundOptions: FundOptions = {
  [FundType.STOCK]: [
    {
      value: "VTSMX",
      label: "VTSMX (Vanguard)",
    },
    {
      value: "VTI",
      label: "VTI (Vanguard)",
    },
    {
      value: "ITOT",
      label: "ITOT (iShares)",
    },
    {
      value: "SCHB",
      label: "SCHB (Schwab)",
    },
    {
      value: "SPTM",
      label: "SPTM (SPDR)",
    },
  ],
  [FundType.INTERNATIONAL_STOCK]: [
    {
      value: "VGTSX",
      label: "VGTSX (Vanguard)",
    },
    {
      value: "VXUS",
      label: "VXUS (Vanguard)",
    },
    {
      value: "IXUS",
      label: "IXUS (iShares)",
    },
    {
      value: "SCHF",
      label: "SCHF (Schwab)",
    },
    {
      value: "SPDW",
      label: "SPDW (SPDR)",
    },
  ],
  [FundType.BOND]: [
    {
      value: "VBMFX",
      label: "VBMFX (Vanguard)",
    },
    {
      value: "BND",
      label: "BND (Vanguard)",
    },
    {
      value: "AGG",
      label: "AGG (iShares)",
    },
    {
      value: "SCHZ",
      label: "SCHZ (Schwab)",
    },
    {
      value: "SPAB",
      label: "SPAB (SPDR)",
    },
  ],
};

export type FundColors = {
  [key in FundType]: {
    bg: string;
    text: string;
    stroke: string;
    fill: string;
  };
};

export const fundColors: FundColors = {
  [FundType.STOCK]: {
    bg: "bg-teal",
    text: "text-teal",
    stroke: "stroke-teal",
    fill: "fill-teal",
  },
  [FundType.INTERNATIONAL_STOCK]: {
    bg: "bg-blue",
    text: "text-blue",
    stroke: "stroke-blue",
    fill: "fill-blue",
  },
  [FundType.BOND]: {
    bg: "bg-purple",
    text: "text-purple",
    stroke: "stroke-purple",
    fill: "fill-purple",
  },
};

export type FundState = {
  [key in FundType]: {
    fund: SelectableOption;
    allocationPercentage: number;
    submittedAllocationPercentage: number;
    locked: boolean;
  };
};

export const initialFundState: FundState = {
  [FundType.STOCK]: {
    fund: fundOptions[FundType.STOCK][0],
    allocationPercentage: 30,
    submittedAllocationPercentage: 30,
    locked: false,
  },
  [FundType.INTERNATIONAL_STOCK]: {
    fund: fundOptions[FundType.INTERNATIONAL_STOCK][0],
    allocationPercentage: 30,
    submittedAllocationPercentage: 30,
    locked: false,
  },
  [FundType.BOND]: {
    fund: fundOptions[FundType.BOND][0],
    allocationPercentage: 40,
    submittedAllocationPercentage: 40,
    locked: false,
  },
};

export const investedAmountInterpolator = SliderInterpolators.LinearRanges(
  [
    [0, MIN_INVESTED_AMOUNT],
    [0.25, 5000],
    [0.5, 50000],
    [0.75, 250000],
    [1, MAX_INVESTED_AMOUNT],
  ],
  (value) => {
    if (value < 5000) {
      return 100;
    } else if (value < 50000) {
      return 1000;
    } else if (value < 250000) {
      return 5000;
    } else {
      return 10000;
    }
  }
);

export type RiskLevelConfig = {
  [key in RiskLevel]: {
    label: string;
    color: string;
    maxDownsideDeviation: number | null;
  };
};

// Max downside deviations coming from Travis
// https://discord.com/channels/821790491594981450/878059842001055794/884511863608598549
export const riskLevelConfig: RiskLevelConfig = {
  [RiskLevel.LOW]: {
    label: "Low",
    color: "text-green",
    maxDownsideDeviation: 1.23,
  },
  [RiskLevel.MODERATE]: {
    label: "Moderate",
    color: "text-yellow",
    maxDownsideDeviation: 2.31,
  },
  [RiskLevel.HIGH]: {
    label: "High",
    color: "text-orange",
    maxDownsideDeviation: null,
  },
};
