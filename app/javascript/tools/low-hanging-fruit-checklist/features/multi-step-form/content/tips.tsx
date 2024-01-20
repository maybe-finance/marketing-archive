import React from "react";

import { PersonalInfo } from "../../../models/personal-info";
import { FinancialInfo } from "../../../models/financial-info";

// @todo - Can we use the actual machine context here?
type Context = { personalInfo: PersonalInfo; financialInfo: FinancialInfo };
export type TipType =
  | "credit"
  | "debt"
  | "education"
  | "estate"
  | "insurance"
  | "medical"
  | "retirement"
  | "savings"
  | "social-security";

export interface Tip {
  id: string;
  title: string | ((context: Context) => string);
  description:
    | string
    | JSX.Element
    | ((context: Context) => string)
    | ((context: Context) => JSX.Element);
  type: TipType;
  isRelevant: (context: Context) => boolean;
}

const tips: Tip[] = [
  {
    id: "AA",
    title: ({ financialInfo }: Context): string => {
      const savingsRate = financialInfo.expenses / financialInfo.income;

      if (savingsRate >= 0.9) {
        return "Work on your savings rate!";
      }

      if (savingsRate >= 0.86) {
        return "Great job on saving some money every month! Almost there";
      }

      if (savingsRate >= 0.81) {
        return "You're on fire saving all that money!";
      }

      return "Amazing savings rate! Keep it up 🔥";
    },
    description: "A good savings target is 15–20% of gross income.",
    type: "savings",
    isRelevant: ({ financialInfo }) => financialInfo.income > 0,
  },
  {
    id: "AB",
    title: ({ financialInfo }: Context): string => {
      const debtToIncome = financialInfo.debt / financialInfo.income;

      if (debtToIncome >= 0.5) {
        return "Stop! Take action now on your debt.";
      }

      return "Try to improve your debt-to-income ratio";
    },
    description:
      "Your debt-to-income (DTI) ratio is an important part of your overall financial health. It’s the percentage of your gross monthly income (before taxes) that goes towards payments for rent, mortgage, credit cards, or other debt. Ideally, you'd like this number to be less than 35%.",
    type: "debt",
    isRelevant: ({ financialInfo }: Context): boolean => {
      if (financialInfo.income <= 0) {
        // Avoid divide by zero errors
        return false;
      }

      const debtToIncome = financialInfo.debt / financialInfo.income;
      return debtToIncome >= 0.35;
    },
  },
  {
    id: "AC",
    title: "Catch up on your retirement contributions",
    description:
      "The government allows you to make an additional $6,500 contribution to your IRA, Roth IRA, 401(k), 403(b), and 457 at age 50.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.age >= 50 && financialInfo.income > financialInfo.expenses,
  },
  {
    id: "AD",
    title:
      "You might be eligible for Social Security benefits as a disabled widow/widower",
    description:
      "If you are disabled and a widow, you may be able to draw Social Security benefits based on your deceased spouse's record.",
    type: "social-security",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age >= 50 && personalInfo.maritalStatus === "widowed",
  },
  {
    id: "AE",
    title:
      "You're eligible to claim Social Security survivor benefits as a widow/widower",
    description: (
      <p>
        If you are a widow, you may be able to draw Social Security benefits
        based on your deceased spouse&rsquo;s record. If you draw the benefit
        before your full retirement age (
        <a
          href="https://www.ssa.gov/benefits/retirement/planner/agereduction.html"
          target="_blank"
          rel="noreferrer"
        >
          what&rsquo;s my full retirement age?
        </a>
        ), the benefit will be reduced, so it might make sense to wait.
      </p>
    ),
    type: "social-security",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age >= 60 && personalInfo.maritalStatus === "widowed",
  },
  {
    id: "AF",
    title: "Make a catch-up contribution to your health savings account",
    description:
      "The government allows you to make an additional $1,000 contribution to HSAs at age 55.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.age >= 55 && financialInfo.income > financialInfo.expenses,
  },
  {
    id: "AG",
    title:
      "You're eligible for penalty exceptions for certain withdrawals from retirement accounts",
    description:
      "The IRS Rule of 55 allows an employee who is laid off, fired, or who quits a job between the ages of 55 and 59 1/2 to pull money out of their 401(k) or 403(b) plan without penalty. Only applies to assets in your current 401(k) or 403(b)—the one you invested in while you were at the job you leave at age 55 or older.",
    type: "retirement",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age >= 55 && personalInfo.age < 60,
  },
  {
    id: "AH",
    title: "You can withdraw from IRAs without 10% early distribution penalty",
    description:
      "In order to discourage people from using their retirement savings for anything other than retirement income, the IRS charges a 10% penalty on most early (i.e., prior to age 59.5) withdrawals from retirement plans.",
    type: "retirement",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 60,
  },
  {
    id: "AI",
    title: "You're eligible to claim Social Security retirement benefits",
    description: (
      <p>
        You are eligible to draw Social Security benefits based on your record.
        If you draw the benefit before your full retirement age (
        <a
          href="https://www.ssa.gov/benefits/retirement/planner/agereduction.html"
          target="_blank"
          rel="noreferrer"
        >
          what&rsquo;s my full retirement age?
        </a>
        ), the benefit will be reduced, so it might make sense to wait.
      </p>
    ),
    type: "social-security",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 62,
  },
  {
    id: "AJ",
    title: "You're eligible to claim Social Security retirement benefits",
    description: (
      <>
        <p>
          When you&rsquo;re first eligible for Medicare, you have a 7-month
          Initial Enrollment Period to sign up for Part A and/or Part B. If
          you&rsquo;re eligible for Medicare when you turn 65, you can sign up
          during the 7-month period that:
        </p>
        <ul>
          <li>Begins 3 months before the month you turn 65</li>
          <li>Includes the month you turn 65</li>
          <li>Ends 3 months after the month you turn 65</li>
        </ul>
      </>
    ),
    type: "medical",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age >= 64 && personalInfo.age <= 66,
  },
  {
    id: "AK",
    title:
      "You can do non-medical withdrawals from your health savings account (HSA) without penalty",
    description:
      "After age 65, you can use your HSA withdrawal for non-medical expenses without paying the 20% tax penalty.",
    type: "retirement",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 65,
  },
  {
    id: "AL",
    title: "You're at your full retirement age",
    description: (
      <p>
        You are eligible to draw Social Security benefits based on your record
        without penalty.
        <a
          href="https://www.ssa.gov/benefits/retirement/planner/agereduction.html"
          target="_blank"
          rel="noreferrer"
        >
          Check your exact full retirement age because it might be between 66
          and 67.
        </a>
      </p>
    ),
    type: "retirement",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age >= 66 && personalInfo.age <= 67,
  },
  {
    id: "AM",
    title: "You're past your full retirement age",
    description:
      "You are past your full retirement age and are eligible to draw Social Security benefits based on your record without penalty. Benefits are increased by a certain percentage for each month you delay starting your benefits beyond full retirement age until age 70.",
    type: "retirement",
    isRelevant: ({ personalInfo }) =>
      personalInfo.age > 67 && personalInfo.age < 70,
  },
  {
    id: "AN",
    title: "Invest enough in employer's retirement plan to get the match",
    description:
      "A match made by your employer is free money. This is a freebie you don't want to miss.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }: Context): boolean => {
      if (personalInfo.age >= 65) {
        return false;
      }

      return financialInfo.expenses < financialInfo.income;
    },
  },
  {
    id: "AO",
    title:
      "Review eligibility of contributing to a health savings account (HSA)",
    description:
      "HSAs let you set aside money on a pre-tax basis to pay for qualified medical expenses. By using untaxed dollars in a Health Savings Account (HSA) to pay for deductibles, copayments, coinsurance, and some other expenses, you may be able to lower your overall health care costs.",
    type: "medical",
    isRelevant: ({ personalInfo, financialInfo }: Context): boolean => {
      if (personalInfo.age >= 65) {
        return false;
      }

      return financialInfo.expenses < financialInfo.income;
    },
  },
  {
    id: "AP",
    title: "Claim your Social Security benefits",
    description:
      "Social Security benefits are increased by a certain percentage for each month you delay starting your benefits beyond full retirement age until age 70. You are past that age and should no longer delay claiming Social Security on your record.",
    type: "social-security",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 70,
  },
  {
    id: "AQ",
    title: "Qualified charitable distribution (QCD)",
    description:
      "A QCD is a direct transfer of funds from your IRA custodian, payable to a qualified charity. QCDs can be counted toward satisfying your required minimum distributions (RMDs) for the year, as long as certain rules are met. A QCD excludes the amount donated from taxable income, which is unlike regular withdrawals from an IRA. Keeping your taxable income lower may reduce the impact to certain tax credits and deductions, including Social Security and Medicare.",
    type: "retirement",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 71,
  },
  {
    id: "AR",
    title: "Required minimum distribution (RMD)",
    description: (
      <>
        <p>
          When you reach age 72, you&rsquo;re required to withdraw a certain
          amount of money from your retirement accounts each year. RMD rules
          apply to tax-deferred retirement accounts:
        </p>
        <ul>
          <li>Traditional IRAs</li>
          <li>Rollover IRAs</li>
          <li>SIMPLE IRAs</li>
          <li>SEP IRAs</li>
          <li>Most small-business accounts</li>
          <li>Most 401(k) and 403(b) plans</li>
        </ul>
      </>
    ),
    type: "retirement",
    isRelevant: ({ personalInfo }) => personalInfo.age >= 72,
  },
  {
    id: "AS",
    title: "Confirm beneficiary designations are accurate",
    description:
      "A beneficiary designation is the description of the person or persons you want to receive a specific asset upon your death. Retirement accounts and insurance contracts have beneficiary designations. Confirm your beneficiary designations are correct to ensure your wishes are carried out.",
    type: "estate",
    isRelevant: () => true,
  },
  {
    id: "AT",
    title: "Consider life insurance on each spouse",
    description:
      "The purpose of life insurance is to alleviate the financial consequences of premature death. Life insurance is almost always economically justified if you earn an income and others are financially dependent on that income for all or part of their financial support.",
    type: "insurance",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus === "married" && financialInfo.income > 0,
  },
  {
    id: "AU",
    title: "Consider life insurance",
    description:
      "The purpose of life insurance is to alleviate the financial consequences of premature death. Life insurance is almost always economically justified if you earn an income and others are financially dependent on that income for all or part of their financial support.",
    type: "insurance",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus !== "married" &&
      personalInfo.dependents > 0 &&
      financialInfo.income > 0,
  },
  {
    id: "AV",
    title: "Consider disability insurance on spouse with income",
    description:
      "The purpose of disability insurance is to provide income in the event that illness or injury prevents you or your spouse from producing the needed income for support. If you earn an income and others are financially dependent on that income for all or part of their financial support, you should consider disability insurance on the spouse with income.",
    type: "insurance",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus === "married" && financialInfo.income > 0,
  },
  {
    id: "AW",
    title: "Consider disability insurance",
    description:
      "The purpose of disability insurance is to provide income in the event that illness or injury prevents you from producing the needed income for support. If you earn an income and others are financially dependent on that income for all or part of their financial support, you should consider disability insurance",
    type: "insurance",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus !== "married" &&
      personalInfo.dependents > 0 &&
      financialInfo.income > 0,
  },
  {
    id: "AX",
    title:
      "Consider obtaining a will and/or trust, healthcare power of attorney, and durable power of attorney",
    description:
      "In the event of your death or incapacity, you want your family to be able to carry out your wishes as easily as possible. Additionally, you want to make sure your dependents are cared for by the individual(s) you trust. Proper estate documents ensure your family can carry out your wishes and provide adequate care for you individuals dependent on you.",
    type: "estate",
    isRelevant: ({ personalInfo }) => personalInfo.dependents > 0,
  },
  {
    id: "AY",
    title:
      "Consider obtaining a will and/or trust, healthcare power of attorney, and durable power of attorney",
    description:
      "In the event of your death or incapacity, you want your family to be able to carry out your wishes as easily as possible. Proper estate documents ensure your family can carry out your wishes in a way you desire.",
    type: "estate",
    isRelevant: ({ personalInfo }) => personalInfo.dependents === 0,
  },
  {
    id: "AZ",
    title: "Consider contributing to a 529 plan for college savings",
    description:
      "If your dependent is a minor and you plan on helping pay for college, contributing funds to a 529 plan could be a tax-efficient way to save and pay for college. Savings plans grow tax-deferred, and withdrawals are tax-free if they're used for qualified education expenses.",
    type: "education",
    isRelevant: ({ personalInfo }) => personalInfo.dependents > 0,
  },
  {
    id: "Aa",
    title: "Consider contributing to a 529 plan for K-12 tuition",
    description:
      "If your dependent is a minor and you pay tuition for K-12 education, you are eligible to withdraw up to $10,000 tax-free from a 529 plan to pay for up to $10,000 per per year in K-12 tuition expenses. Some states also offer an additional tax benefit for families who use their 529 plan to pay for elementary or high school.",
    type: "education",
    isRelevant: ({ personalInfo }) => personalInfo.dependents > 0,
  },
  {
    id: "Ab",
    title: "Consider a Roth IRA contribution",
    description:
      "A Roth IRA is an individual retirement account (IRA) that allows qualified withdrawals on a tax-free basis provided certain conditions are satisfied. Roth IRAs are funded with after-tax dollars; the contributions are not tax-deductible. But once you start withdrawing funds, the money is tax-free.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus !== "married" &&
      personalInfo.age < 70 &&
      financialInfo.income > financialInfo.expenses &&
      financialInfo.income < 10417,
  },
  {
    id: "Ac",
    title: "Consider a Roth IRA contribution for each spouse",
    description:
      "A Roth IRA is an individual retirement account (IRA) that allows qualified withdrawals on a tax-free basis provided certain conditions are satisfied. Roth IRAs are funded with after-tax dollars; the contributions are not tax-deductible. But once you start withdrawing funds, the money is tax-free. You may fund a Roth IRA on behalf of your married partner who earns little or no income. Spousal Roth IRA contributions are subject to the same rules and limits as regular Roth IRA contributions.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus === "married" &&
      personalInfo.age < 70 &&
      financialInfo.income > financialInfo.expenses &&
      financialInfo.income < 16500,
  },
  {
    id: "Ad",
    title: "Consider a backdoor Roth IRA contribution for each spouse",
    description:
      "A Roth IRA is an individual retirement account (IRA) that allows qualified withdrawals on a tax-free basis provided certain conditions are satisfied. Roth IRAs are funded with after-tax dollars; the contributions are not tax-deductible. But once you start withdrawing funds, the money is tax-free. You may fund a Roth IRA on behalf of your married partner who earns little or no income. Spousal Roth IRA contributions are subject to the same rules and limits as regular Roth IRA contributions. A backdoor Roth IRA contribution is an informal name for a complicated but IRS-sanctioned method for high-income taxpayers to fund a Roth, even if their incomes exceed the limits that the IRS allows for regular Roth contributions.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus === "married" &&
      personalInfo.age < 70 &&
      financialInfo.income > financialInfo.expenses &&
      financialInfo.income >= 16500,
  },
  {
    id: "Ae",
    title: "Consider a backdoor Roth IRA contribution",
    description:
      "A Roth IRA is an individual retirement account (IRA) that allows qualified withdrawals on a tax-free basis provided certain conditions are satisfied. Roth IRAs are funded with after-tax dollars; the contributions are not tax-deductible. But once you start withdrawing funds, the money is tax-free. A backdoor Roth IRA contribution is an informal name for a complicated but IRS-sanctioned method for high-income taxpayers to fund a Roth, even if their incomes exceed the limits that the IRS allows for regular Roth contributions.",
    type: "retirement",
    isRelevant: ({ personalInfo, financialInfo }) =>
      personalInfo.maritalStatus !== "married" &&
      personalInfo.age < 70 &&
      financialInfo.income > financialInfo.expenses &&
      financialInfo.income >= 10417,
  },
  {
    id: "Af",
    title: "Consider a Roth conversion",
    description:
      "A Roth IRA conversion is a transfer of retirement assets from a qualified retirement account (Traditional IRA, SEP IRA, or SIMPLE IRA) into a Roth IRA, creating a taxable event. A Roth IRA conversion can be advantageous if you have large qualified retirement accounts and expect your future tax rate to stay at the same level or grow at the time you plan to start withdrawing from qualified retirement accounts. Roth IRAs allow for tax-free withdrawals of qualified distributions.",
    type: "retirement",
    isRelevant: ({ personalInfo }) => personalInfo.age < 72,
  },
  {
    id: "Ag",
    title: "Check your credit reports",
    description: (
      <p>
        Your credit report gives potential lenders information about you and
        your payment history, with recent activities receiving more
        consideration. By law, you&rsquo;re allowed to obtain your credit report
        once a year for free (go to{" "}
        <a
          href="https://annualcreditreport.com"
          target="_blank"
          rel="noreferrer"
        >
          annualcreditreport.com
        </a>{" "}
        to access yours). In reviewing your credit report, you want to make sure
        all your personal information and borrowing history is correct.
      </p>
    ),
    type: "credit",
    isRelevant: ({ personalInfo }) => personalInfo.age < 65,
  },
  {
    id: "Ah",
    title: "Check your credit score",
    description: (
      <p>
        Your credit score is an easy-to-digest number between 300 and 850 (the
        higher the better) that indicates the riskiness of lending you money.
        This score is used in combination with other data points (age and
        income) to decide whether or not to loan you money and at what rate. To
        check your score, you have a free option at{" "}
        <a href="https://creditkarma.com" target="_blank" rel="noreferrer">
          creditkarma.com
        </a>{" "}
        or an option with a small fee at{" "}
        <a href="https://myfico.com" target="_blank" rel="noreferrer">
          myfico.com
        </a>
        .
      </p>
    ),
    type: "credit",
    isRelevant: ({ personalInfo }) => personalInfo.age < 65,
  },
];

export default tips;
