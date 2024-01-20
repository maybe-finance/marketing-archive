import React, { useEffect, useMemo, useState } from "react";
import { Input, InputCurrency } from "../../../components/inputs";
import { Select, SelectableOption } from "../../../components/select";

import config from "./config";
import type { ContributionFrequency, Form as FormType } from "./types";

type FormProps = {
  form: FormType;
  onSubmit: (form: FormType) => void;
};

export default function Form({ onSubmit, form }: FormProps): JSX.Element {
  const [contribution, setContribution] = useState(form.contribution);
  const [contributionFrequency, setContributionFrequency] =
    useState<ContributionFrequency>(form.contributionFrequency);
  const [initialInvestment, setInitialInvestment] = useState(
    form.initialInvestment
  );
  const [yearsToGrow, setYearsToGrow] = useState(form.yearsToGrow);
  const [interestRate, setInterestRate] = useState(form.interestRate);

  const updatedForm: FormType = {
    initialInvestment,
    contribution,
    contributionFrequency,
    yearsToGrow: Math.max(yearsToGrow, 1),
    interestRate: Math.max(interestRate, 0),
  };

  useEffect(() => {
    onSubmit(updatedForm);
  }, [
    contribution,
    contributionFrequency,
    initialInvestment,
    yearsToGrow,
    interestRate,
  ]);

  const selectedOption = useMemo(() => {
    const option = config.CONTRIBUTION_FREQUENCY_OPTIONS.find(
      (option) => option.value === contributionFrequency
    );

    return option || config.CONTRIBUTION_FREQUENCY_OPTIONS[0];
  }, [contributionFrequency]);

  return (
    <form className="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 lg:flex lg:flex-col lg:max-w-xs w-full ">
      <InputCurrency
        label="Initial investment"
        value={initialInvestment}
        allowNegative={false}
        min={0}
        onValueChange={setInitialInvestment}
      />
      <div className="flex justify-end items-end">
        <div className="flex-grow">
          <InputCurrency
            inputWrapperClassName="pr-0"
            label="Contribution"
            value={contribution}
            allowNegative={false}
            min={0}
            onValueChange={setContribution}
            fixedRight={
              <Select
                withButtonRing={false}
                buttonClassName="bg-gray-800 text-white rounded-l-none"
                optionClassName="hover:bg-gray-700 text-white text-left"
                options={config.CONTRIBUTION_FREQUENCY_OPTIONS}
                selectedOption={selectedOption}
                onChange={(option: SelectableOption) => {
                  setContributionFrequency(
                    option.value as ContributionFrequency
                  );
                }}
              />
            }
          />
        </div>
      </div>
      <Input
        label="Years to grow"
        fixedRight={<span className="text-gray-100">years</span>}
        type="number"
        value={yearsToGrow}
        onChange={(event) => {
          setYearsToGrow(event.currentTarget.value);
        }}
        onBlur={(event) => {
          setYearsToGrow(Math.max(event.currentTarget.value, 1));
        }}
      />
      <Input
        label="Annual interest rate"
        fixedRight={<span className="text-gray-100">%</span>}
        type="number"
        value={interestRate}
        onChange={(event) => {
          setInterestRate(event.currentTarget.value);
        }}
        onBlur={(event) => {
          setInterestRate(Math.max(event.currentTarget.value, 0));
        }}
      />
    </form>
  );
}
