import { SelectableOption } from "../../../components/select";
import { Form } from "./types";

export const INITIAL_FORM_VALUES: Form = {
  contribution: 500,
  contributionFrequency: "month",
  initialInvestment: 10000,
  interestRate: 6.0,
  yearsToGrow: 25,
};

const CONTRIBUTION_FREQUENCY_OPTIONS: SelectableOption[] = [
  { value: "week", label: "per week" },
  { value: "month", label: "per month" },
  { value: "year", label: "per year" },
];

export default {
  INITIAL_FORM_VALUES,
  CONTRIBUTION_FREQUENCY_OPTIONS,
};
