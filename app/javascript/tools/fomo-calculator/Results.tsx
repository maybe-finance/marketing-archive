import React, { useCallback } from "react";
import numeral from "numeral";
import { ChartData } from "./lib";
import { ParentSize } from "@visx/responsive";
import ResultsLineChart from "./ResultsLineChart";
import Confetti from "../../components/Confetti";

interface ResultsProps {
  lineGraphData: ChartData | undefined;
  isCalculating: boolean;
  isForecast: boolean;
  assetName: string;
  forecastDuration: number;
}

export default function Results({
  lineGraphData,
  isCalculating,
  isForecast,
  assetName,
  forecastDuration,
}: ResultsProps): JSX.Element {
  const currentValue = numeral(lineGraphData?.currentInvestmentValue).format(
    "$0,0"
  );

  const friendlyAmount = numeral(lineGraphData?.initialInvestment).format(
    "$0,0"
  );

  const rawFactor = Math.abs(lineGraphData?.oppCostMultiple ?? 0);
  const isBadOutcome = rawFactor > 1;
  const roundedFactor = numeral(rawFactor).format("0.0");
  const shouldShowDollarAmount = roundedFactor === "1.0" || !isBadOutcome;
  const dollarVariance = numeral(
    Math.abs(
      lineGraphData
        ? lineGraphData?.currentInvestmentValue -
            lineGraphData?.initialInvestment
        : 0
    )
  ).format("$0,0");

  function getGrayTextOutcome(): string {
    const part1 = isBadOutcome
      ? "Did you really need that thing?"
      : "Good choice";
    const part2 = isForecast && !isBadOutcome ? "? Maybe." : "!";
    return part1 + part2;
  }

  function getWhiteTextOutcome(): string {
    if (isForecast && !isBadOutcome) {
      return "You'd be up";
    }

    return isBadOutcome ? "You could have" : "You're up";
  }

  function getRedTextOutcome(): string {
    const formattedFactor = roundedFactor + "×";
    const dollarDisplay = isBadOutcome
      ? `${dollarVariance} more, `
      : dollarVariance;
    const prefix = shouldShowDollarAmount ? dollarDisplay : formattedFactor;

    if (isForecast) {
      const duration =
        forecastDuration === 12
          ? "a year"
          : Math.round(forecastDuration / 12) + " years";

      return isBadOutcome
        ? `${prefix}${shouldShowDollarAmount ? "" : " of it "}in ${duration}`
        : `${
            shouldShowDollarAmount ? dollarVariance : formattedFactor
          } compared to your expected outcome!`;
    } else {
      return isBadOutcome
        ? `${prefix} of it today`
        : `${prefix} compared to that!`;
    }
  }

  const renderParticleEmoji = useCallback((particle, context) => {
    context.font = `${particle.width * 0.3}vw sans-serif`;
    context.fillText("😭", 0, 0);
  }, []);

  return (
    <div>
      {lineGraphData && (
        <>
          <div className="text-center font-black font-display text-2xl sm:text-4xl mb-16">
            <span className="text-gray-300 block mb-6 sm:mb-0">
              {getGrayTextOutcome()}
            </span>
            <span>{getWhiteTextOutcome()}&nbsp;</span>
            <span className="text-red">{getRedTextOutcome()}</span>
          </div>
          <div className="flex flex-col gap-4 items-center text-center sm:flex-row justify-between mb-4">
            <div className="sm:text-left ml-2">
              <p className="text-lg text-gray-100 mb-2">Your spend</p>
              <p className="font-black text-2xl sm:text-4xl font-display">
                {friendlyAmount}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-lg text-gray-100 mb-2">
                {assetName} {isForecast ? "estimated value*" : "current value"}
              </p>
              <p className="font-black text-2xl sm:text-4xl text-red font-display">
                {currentValue}
              </p>
            </div>
          </div>
        </>
      )}
      <div className="h-96">
        <ParentSize>
          {({ width, height }) =>
            lineGraphData && (
              <ResultsLineChart
                width={width}
                height={height}
                margin={{ top: 40, right: 50, bottom: 50, left: 8 }}
                chartData={lineGraphData}
                startDateString={lineGraphData.series[0].actual.date.toFormat(
                  "MMM yyyy"
                )}
                assetLabel={assetName}
                isForecastChart={isForecast}
              />
            )
          }
        </ParentSize>
      </div>
      {lineGraphData && !isCalculating && !isForecast && rawFactor > 4 && (
        <Confetti
          amount={40}
          gravity={0.015}
          respawn={false}
          sway={0}
          rotate={false}
          renderParticle={renderParticleEmoji}
        />
      )}
    </div>
  );
}
