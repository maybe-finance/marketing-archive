import type { Form, Result } from "../types";

type UseCompoundCalculator = (form: Form) => Result;

const getTotalValue = (total: number[], form: Form) => {
  const totalValue = total[form.yearsToGrow];

  const [integer, decimal] = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
    .format(totalValue)
    .split(".");

  return {
    integer,
    decimal,
  };
};

const getYearContribution = (form: Form) => {
  if (form.contributionFrequency === "year") {
    return form.contribution;
  }

  if (form.contributionFrequency === "month") {
    return form.contribution * 12;
  }

  if (form.contributionFrequency === "week") {
    return form.contribution * 52;
  }

  return 0;
};

const useCompoundCalculator: UseCompoundCalculator = (form) => {
  const contributed = [form.initialInvestment];
  const interest = [0];
  const total = [form.initialInvestment];

  const yearContribution = getYearContribution(form);

  for (let year = 1; year <= form.yearsToGrow; year++) {
    contributed.push(contributed[year - 1] + yearContribution);

    total.push(
      total[year - 1] * (1 + form.interestRate / 100) + yearContribution
    );

    interest.push(total[year] - contributed[year]);
  }

  return {
    contributed,
    interest,
    total,
    totalValue: getTotalValue(total, form),
  };
};

export default useCompoundCalculator;
