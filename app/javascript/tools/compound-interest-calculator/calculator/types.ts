export type ContributionFrequency = "week" | "month" | "year";

export type Form = {
  initialInvestment: number;
  contribution: number;
  contributionFrequency: ContributionFrequency;
  yearsToGrow: number;
  interestRate: number;
};

export type Result = {
  contributed: number[];
  interest: number[];
  total: number[];
  totalValue: {
    integer: string;
    decimal: string;
  };
};
