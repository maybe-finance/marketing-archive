import React, { useState, useEffect } from "react";
import { FundsIcon } from "../../../../components/icons";
import { InputCurrency } from "../../../../components/inputs";
import { Select } from "../../../../components/select";
import {
  fundOptions,
  weightingOptions,
  initialFormState,
  MAX_AMOUNT_INVESTED,
  MIN_AMOUNT_INVESTED,
} from "../../config";
import { FormState, WeightingStrategy } from "../../types";

const getInitialFundOption = () => {
  const fundOption = fundOptions.find(
    (option) => option.value === initialFormState.fundName
  );

  return fundOption || fundOptions[0];
};

const getInitialWeightingOption = () => {
  const weightingOption = weightingOptions.find(
    (option) => option.value === initialFormState.weighting
  );

  return weightingOption || weightingOptions[0];
};
interface FormProps {
  onCalculate: (form: FormState) => void;
}

export default function Form({ onCalculate }: FormProps): JSX.Element {
  const [amountInvested, setamountInvested] = useState(
    initialFormState.amountInvested
  );
  const [fundOption, setFundOption] = useState(getInitialFundOption);
  const [weighting, setWeighting] = useState(getInitialWeightingOption);

  const calculate = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    onCalculate({
      amountInvested,
      fundName: fundOption.value,
      weighting: weighting.value as WeightingStrategy,
    });
  };

  useEffect(() => {
    calculate();
  }, [`${amountInvested} ${fundOption.value} ${weighting.value}`]);

  return (
    <div className="z-10 relative p-6 md:p-12 rounded-lg md:rounded-2xl bg-gray-900">
      <form
        className="z-10 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 items-end"
        onSubmit={(event) => calculate(event)}
      >
        <InputCurrency
          label="How much would you invest?"
          value={amountInvested}
          allowNegative={false}
          min={MIN_AMOUNT_INVESTED}
          max={MAX_AMOUNT_INVESTED}
          onValueChange={(value) =>
            setamountInvested(Math.min(value, MAX_AMOUNT_INVESTED))
          }
          onBlur={() => setamountInvested(amountInvested)}
          data-testid="invested-amount"
        />
        <Select
          options={fundOptions}
          selectedOption={fundOption}
          onChange={(option) => setFundOption(option)}
          label="Which fund will you pick?"
          icon={<FundsIcon />}
          data-testid="fund"
          optionsClassName="min-w-84"
          optionClassName="h-14"
        />
        <Select
          options={weightingOptions}
          selectedOption={weighting}
          onChange={(option) => setWeighting(option)}
          label="What should the weighting be?"
          data-testid="weighting"
        />
      </form>
    </div>
  );
}
