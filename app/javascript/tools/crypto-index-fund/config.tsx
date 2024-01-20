import React from "react";

import SymbolsLogo from "./components/SymbolsLogo";
import rawFunds from "./data/funds.json";
import type { SelectableOption } from "../../components/select";
import type { FormState, WeightingStrategy } from "./types";

export const MIN_AMOUNT_INVESTED = 100;
export const MAX_AMOUNT_INVESTED = 1000000;

export const fundOptions: SelectableOption[] = rawFunds.map((rawFund) => ({
  label: rawFund.name,
  value: rawFund.name,
  details: <SymbolsLogo symbols={rawFund.symbols} />,
}));

export const weightingOptions: SelectableOption[] = [
  {
    value: "market-cap-weighted",
    label: "Market cap weighted",
    icon: <i className="ri-scales-2-line text-gray-100" />,
  },
  {
    value: "equally-weighted",
    label: "Equally weighted",
    icon: <i className="ri-scales-3-line text-gray-100" />,
  },
  {
    value: "custom",
    label: "Custom",
    icon: <i className="ri-percent-line text-gray-100" />,
  },
];

export const initialFormState: FormState = {
  amountInvested: 1000,
  fundName: fundOptions[0].value,
  weighting: weightingOptions[0].value as WeightingStrategy,
};
