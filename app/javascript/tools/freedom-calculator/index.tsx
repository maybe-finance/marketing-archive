import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { motion, AnimateSharedLayout } from "framer-motion";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";
import { ToolHeader } from "../../components/tool";
import { Button } from "../../components/button";
import { InputCurrency, InputRate } from "../../components/inputs";
import {
  Slider,
  SliderVariant,
  SliderInterpolators,
} from "../../components/slider";
import EarlyAccessFooter from "../../components/EarlyAccessFooter";
import Tips from "./components/Tips";
import Results from "./components/Results";

export default function Home(): JSX.Element {
  const [savings, setSavings] = useState(25000);
  const [expenses, setExpenses] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(5);

  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
  };

  const mainWrapper = useRef<HTMLDivElement>(null);

  // Scroll to results when submitted
  useEffect(() => {
    if (submitted) {
      mainWrapper.current &&
        smoothScrollIntoView(mainWrapper.current, {
          scrollMode: "if-needed",
          block: "nearest",
          inline: "nearest",
        });
    }
  }, [submitted]);

  const savingsInterpolator = useMemo(
    () =>
      SliderInterpolators.LinearRanges([
        [0, 0],
        [0.5, 400000],
        [0.7, 800000],
        [1, 20000000],
      ]),
    []
  );

  const expensesInterpolator = useMemo(
    () =>
      SliderInterpolators.LinearRanges([
        [0, 0],
        [0.5, 15000],
        [0.7, 30000],
        [1, 1000000],
      ]),
    []
  );

  const annualReturnInterpolator = useMemo(
    () =>
      SliderInterpolators.LinearRanges([
        [0, 0],
        [0.5, 10],
        [1, 100],
      ]),
    []
  );

  return (
    <div className="px-4 overflow-hidden text-white">
      <ToolHeader
        title="Financial Freedom Calculator"
        description="How long will your savings last?"
        gradientClassName="from-red via-lilac to-teal"
      />

      <main
        ref={mainWrapper}
        className={classNames(
          "mt-10 sm:mt-14",
          submitted ? "max-w-6xl" : "max-w-4xl",
          "mx-auto flex items-start flex-wrap md:flex-nowrap"
        )}
      >
        <AnimateSharedLayout>
          <section
            className={classNames(
              submitted
                ? "rounded-2xl bg-gradient-to-b from-gray-900 to-black"
                : "rounded-lg bg-gray-900",
              "w-full md:w-1/2 flex-grow p-5 md:p-10"
            )}
          >
            {/* Inputs and Calculate button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className={classNames(
                submitted && "md:flex-row md:items-end",
                "flex flex-col"
              )}
            >
              <motion.div layout className="flex-1">
                <InputCurrency
                  label="Current savings"
                  value={savings}
                  allowNegative={false}
                  onValueChange={(value) => setSavings(value)}
                />
                {submitted && (
                  <div className="px-3 mt-6">
                    <Slider
                      variant={SliderVariant.Blue}
                      value={savings}
                      setValue={setSavings}
                      min={0}
                      max={20000000}
                      stepSize={1000}
                      interpolator={savingsInterpolator}
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                layout
                className={classNames(
                  "flex-1",
                  submitted ? "mt-8 md:mt-0 md:ml-8" : "mt-8"
                )}
              >
                <InputCurrency
                  label="Monthly expenses"
                  value={expenses}
                  allowNegative={false}
                  onValueChange={(value) => setExpenses(value)}
                />
                {submitted && (
                  <div className="px-3 mt-6">
                    <Slider
                      variant={SliderVariant.Red}
                      value={expenses}
                      setValue={setExpenses}
                      min={0}
                      max={1000000}
                      stepSize={100}
                      interpolator={expensesInterpolator}
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                layout
                className={classNames(
                  "flex-1",
                  submitted ? "mt-8 md:mt-0 md:ml-8" : "mt-8"
                )}
              >
                <InputRate
                  label="Annual return on savings"
                  value={annualReturn}
                  allowNegative={false}
                  onValueChange={(value) => setAnnualReturn(value)}
                />
                {submitted && (
                  <div className="px-3 mt-6">
                    <Slider
                      variant={SliderVariant.Purple}
                      value={annualReturn}
                      setValue={setAnnualReturn}
                      min={0}
                      max={100}
                      stepSize={0.5}
                      interpolator={annualReturnInterpolator}
                    />
                  </div>
                )}
              </motion.div>

              {!submitted && (
                <motion.div
                  layout
                  className={classNames(
                    "flex-1",
                    submitted ? "mt-8 md:ml-8" : "mt-8"
                  )}
                >
                  <Button
                    onClick={submit}
                    disabled={savings <= 0 || expenses <= 0}
                  >
                    Calculate
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Results & Early Access footer */}
            {submitted && (
              <motion.div
                className="px-5 pt-5 mt-12 overflow-hidden bg-black rounded-lg md:px-10 md:pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Results
                  savings={savings}
                  expenses={expenses}
                  annualReturn={annualReturn}
                />
                <div className="mt-16">
                  <EarlyAccessFooter />
                </div>
              </motion.div>
            )}
          </section>
        </AnimateSharedLayout>
        {!submitted && (
          <motion.section
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ position: "fixed", opacity: 0 }}
            className="flex-grow w-1/2 mt-16 md:ml-16 md:mt-0"
          >
            <Tips />
          </motion.section>
        )}
      </main>
      {submitted}
    </div>
  );
}
