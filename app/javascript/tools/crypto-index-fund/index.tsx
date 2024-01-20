import React, { useState, useEffect } from "react";

import { ToolHeader } from "../../components/tool";
import Form from "./components/Form";
import Returns from "./components/Returns";
import Distribution from "./components/Distribution";
import Period from "./components/Period";
import Chart from "./components/Chart";
import Table from "./components/Table";
import Tips from "./components/Tips";
import Calculating from "./components/Calculating";
import Start from "./components/Start";
import End from "./components/End";
import useCurrencies from "./useCurrencies";
import useWeights from "./useWeights";
import useReturns from "./useReturns";
import useTable from "./useTable";
import useChart from "./useChart";
import { initialFormState } from "./config";
import { FormState, Period as PeriodType } from "./types";
import { FeedbackWidget } from "../../components/feedback-widget";

export default function CryptoIndexFund(): JSX.Element {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [period, setPeriod] = useState<PeriodType>("90d");
  const { isLoadingCurrencies, currencies } = useCurrencies(form.fundName);
  const weights = useWeights(form.weighting, currencies);
  const returns = useReturns(
    period,
    weights.weights,
    currencies,
    form.amountInvested
  );
  const rows = useTable(
    form.amountInvested,
    currencies,
    weights.weights,
    weights.changeWeight,
    period
  );
  const data = useChart(
    form.amountInvested,
    currencies,
    weights.weights,
    period
  );
  const firstLoad = currencies.length === 0;

  const onCalculate = (formState: FormState) => {
    setForm(formState);
  };

  useEffect(() => {
    onCalculate(form);
  }, []);

  return (
    <div className="px-4 mb-12">
      <ToolHeader
        title="Crypto Index Fund"
        description="Simulate investments in a wide range of crypto themes (DeFi, NFTs, Blue Chip) using a selection of premade crypto index funds"
        gradientClassName="from-purple to-blue"
      />
      <div className="mx-auto mt-10 space-y-6 sm:mt-14 max-w-7xl">
        <Form onCalculate={onCalculate} />

        <div className="pb-10 overflow-hidden rounded-lg md:rounded-2xl bg-gradient-to-b from-gray-900 relative">
          <Calculating isLoadingCurrencies={isLoadingCurrencies} />

          <div className="relative">
            <Chart
              data={data}
              returns={returns}
              period={period}
              weighting={form.weighting}
              currencies={currencies}
            />
            {!isLoadingCurrencies && <Returns returns={returns} />}
          </div>
          <div className="px-6 space-y-10 md:px-12">
            <div className="relative hidden md:block">
              <div className="absolute left-0 top-2.5">
                <Start returns={returns} />
              </div>
              <div className="absolute right-0 top-2.5">
                <End returns={returns} />
              </div>
              <div className="flex justify-center">
                <Period period={period} onChange={setPeriod} />
              </div>
            </div>
            <div className="flex flex-col md:hidden">
              <div className="flex justify-between">
                <Start returns={returns} />
                <End returns={returns} />
              </div>
              <div className="flex justify-center">
                <Period period={period} onChange={setPeriod} />
              </div>
            </div>
            {!firstLoad && (
              <>
                <Distribution
                  currencies={currencies}
                  weights={weights.weights}
                />
                <Table rows={rows} weights={weights} />
              </>
            )}
          </div>
        </div>

        <Tips />
      </div>

      <FeedbackWidget />
    </div>
  );
}
