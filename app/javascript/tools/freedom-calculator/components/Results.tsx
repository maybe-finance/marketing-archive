import classNames from "classnames";
import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Freedom from "./Freedom";
import Broke from "./Broke";
import ResultsChart from "./ResultsChart";

export type ResultsProps = {
  savings: number;
  expenses: number;
  annualReturn: number;
  debounceTimeout?: number;
};

export default function Results({
  savings,
  expenses,
  annualReturn,
  debounceTimeout = 750,
}: ResultsProps): JSX.Element {
  const [isFreedom, setIsFreedom] = useState<boolean | null>(null);
  const [months, setMonths] = useState<
    {
      month: number;
      startingAmount: number;
      endingAmount: number;
    }[]
  >([]);
  const [waitingForDebounce, setWaitingForDebounce] = useState(false);

  const calculate = useCallback(() => {
    const freedom = () => {
      setIsFreedom(true);
      setMonths([]);
    };

    const growthDecimal = 1 + annualReturn / 12 / 100;

    if ((savings - expenses) * growthDecimal >= savings) return freedom();

    const months = [];
    let monthIndex = 0;
    let remainingSavings = savings;

    while (remainingSavings >= expenses) {
      const startingSavings = remainingSavings;
      remainingSavings -= expenses;
      remainingSavings *= growthDecimal;

      months.push({
        month: monthIndex++,
        startingAmount: startingSavings,
        endingAmount: remainingSavings,
      });

      if (monthIndex > 1200) {
        // We've passed 100 years, consider it freedom!
        return freedom();
      }
    }

    setIsFreedom(false);
    setMonths(months);
  }, [savings, expenses, annualReturn]);

  const debounceTimeoutId = useRef<number | null>(null);

  // Re-calculate (debounced) when inputs change
  useEffect(() => {
    if (isFreedom === null) {
      calculate();
      return;
    }

    if (!waitingForDebounce) setWaitingForDebounce(true);

    debounceTimeoutId.current !== null &&
      window.clearTimeout(debounceTimeoutId.current);

    debounceTimeoutId.current = window.setTimeout(() => {
      calculate();
      setWaitingForDebounce(false);
    }, debounceTimeout);
  }, [calculate, savings, expenses, annualReturn]);

  const [yearsRemaining, monthsRemaining] = useMemo(() => {
    return isFreedom
      ? [0, 0]
      : [Math.floor(months.length / 12), months.length % 12];
  }, [isFreedom, months]);

  return (
    <div
      className={classNames(
        "transition-opacity",
        waitingForDebounce && "opacity-40"
      )}
    >
      {isFreedom ? (
        <Freedom />
      ) : months.length === 0 ? (
        <Broke />
      ) : (
        <>
          <div
            role="heading"
            className="text-lg text-center font-bold leading-tight font-display text-gray-100"
          >
            You have
            {yearsRemaining > 0 && (
              <>
                &nbsp;
                <span className="text-white">
                  {yearsRemaining} year{yearsRemaining > 1 && "s"}
                </span>
                {monthsRemaining > 0 && " and"}
              </>
            )}
            {monthsRemaining > 0 && (
              <>
                &nbsp;
                <span className="text-white">
                  {monthsRemaining} month{monthsRemaining > 1 && "s"}
                </span>
              </>
            )}
            &nbsp;of freedom ahead of you.
          </div>
          <div className="w-full h-80 mt-12">
            <ResultsChart months={months} />
          </div>
        </>
      )}
    </div>
  );
}
