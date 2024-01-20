import React, { useState, useReducer, useEffect } from "react";
import classNames from "classnames";
import pick from "lodash/pick";
import mapValues from "lodash/mapValues";
import {
  motion,
  MotionConfig,
  AnimateSharedLayout,
  AnimatePresence,
} from "framer-motion";
import { ToolHeader } from "../../components/tool";
import { Select, SelectableOption } from "../../components/select";
import { InputCurrency } from "../../components/inputs";
import { Slider, SliderVariant } from "../../components/slider";
import { Tooltip } from "../../components/tooltip";
import { Button } from "../../components/button";
import { TipCard } from "../../components/tip-card";
import {
  LockIcon,
  BranchIcon,
  FocusIcon,
  CoinsIcon,
} from "../../components/icons";
import {
  SPAN_IN_YEARS,
  MIN_INVESTED_AMOUNT,
  MAX_INVESTED_AMOUNT,
  GREAT_RESULT_MIN_PERCENTAGE_RETURN,
  GREAT_RESULT_RISK_LEVELS,
  FundType,
  fundOptions,
  fundColors,
  FundState,
  initialFundState,
  investedAmountInterpolator,
} from "./config";
import Results from "./Results";
import { ChartData } from "./ResultsChart";
import EarlyAccessFooter from "../../components/EarlyAccessFooter";
import Confetti, { Particle } from "../../components/Confetti";
import { FeedbackWidget } from "../../components/feedback-widget";

type FundStateReducerAction =
  | {
      type: "resetFunds";
    }
  | {
      fundType: FundType;
      type: "setFund";
      fund: SelectableOption;
    }
  | {
      fundType: FundType;
      type: "setAllocationPercentage";
      allocationPercentage: number;
    }
  | {
      fundType: FundType;
      type: "submitAllocationPercentage";
    }
  | {
      fundType: FundType;
      type: "toggleLocked";
    };

const fundStateReducer = function (
  state: FundState,
  action: FundStateReducerAction
): FundState {
  const otherFundTypes =
    action.type !== "resetFunds"
      ? Object.values(FundType).filter(
          (fundType) => fundType !== action.fundType
        )
      : [];
  const stateOfOtherFunds = pick(state, otherFundTypes);
  switch (action.type) {
    case "resetFunds":
      return {
        ...mapValues(state, (stateOfFund, fundType) => ({
          ...stateOfFund,
          fund: initialFundState[fundType as FundType].fund,
        })),
      };
    case "setFund":
      return {
        ...state,
        [action.fundType]: {
          ...state[action.fundType],
          fund: action.fund,
        },
      };
    case "setAllocationPercentage":
      /* eslint-disable no-case-declarations */
      /**
       * Determine how much allocation percentage we should distribute after
       * updating the allocation percentage of this fund, and among how many
       * funds (i.e. the other unlocked one(s); can only be 1 or 2, but this
       * code should work for any number of locked/unlocked funds).
       */
      let lockedAllocationPercentage = 0;
      let unlockedSubmittedAllocationPercentage = 0;
      let unlockedCount = 0;
      Object.keys(stateOfOtherFunds).forEach((otherFundType) => {
        const stateOfOtherFund = stateOfOtherFunds[otherFundType as FundType];
        if (stateOfOtherFund.locked) {
          lockedAllocationPercentage += stateOfOtherFund.allocationPercentage;
        } else {
          unlockedSubmittedAllocationPercentage +=
            stateOfOtherFund.submittedAllocationPercentage;
          unlockedCount++;
        }
      });
      const allocationPercentageToDistribute =
        100 - action.allocationPercentage - lockedAllocationPercentage;
      let allocationPercentageDistributed = 0;
      let distributedCount = 0;
      /* eslint-enable no-case-declarations */
      return {
        ...mapValues(stateOfOtherFunds, (stateOfOtherFund) => {
          let allocationPercentage = stateOfOtherFund.allocationPercentage;
          if (!stateOfOtherFund.locked) {
            // Determine how much of the `allocationPercentageToDistribute` this fund gets
            if (distributedCount === unlockedCount - 1) {
              allocationPercentage =
                allocationPercentageToDistribute -
                allocationPercentageDistributed;
            } else if (unlockedSubmittedAllocationPercentage === 0) {
              allocationPercentage = Math.floor(
                allocationPercentageToDistribute / unlockedCount
              );
            } else {
              allocationPercentage = Math.floor(
                (stateOfOtherFund.submittedAllocationPercentage /
                  unlockedSubmittedAllocationPercentage) *
                  allocationPercentageToDistribute
              );
            }
            allocationPercentageDistributed += allocationPercentage;
            distributedCount++;
          }
          return {
            ...stateOfOtherFund,
            allocationPercentage,
          };
        }),
        [action.fundType]: {
          ...state[action.fundType],
          allocationPercentage: action.allocationPercentage,
        },
      };
    case "submitAllocationPercentage":
      return {
        [action.fundType]: {
          ...state[action.fundType],
          submittedAllocationPercentage:
            state[action.fundType].allocationPercentage,
        },
        ...mapValues(stateOfOtherFunds, (stateOfOtherFund) => ({
          ...stateOfOtherFund,
          submittedAllocationPercentage: stateOfOtherFund.allocationPercentage,
        })),
      };
    case "toggleLocked":
      return {
        ...mapValues(stateOfOtherFunds, (stateOfOtherFund) => ({
          ...stateOfOtherFund,
          locked: false,
        })),
        [action.fundType]: {
          ...state[action.fundType],
          locked: state[action.fundType].locked ? false : true,
        },
      };
  }
};

const extendGenerateParticleRocket = (
  particle: Particle,
  context: CanvasRenderingContext2D
) => {
  const launchPadLeftOffset = context.canvas.height;
  const launchPadWidth = context.canvas.width + launchPadLeftOffset;
  const size = 20 + Math.random() * 20;
  const speed = size * 0.25;
  return {
    ...particle,
    x: 0 - launchPadLeftOffset + Math.random() * launchPadWidth,
    width: size,
    height: size,
    velocityX: speed,
    velocityY: -speed,
  };
};

const renderParticleRocket = (
  particle: Particle,
  context: CanvasRenderingContext2D
) => {
  context.font = `${particle.width}px sans-serif`;
  context.fillText("🚀", 0, 0);
};

export default function Home(): JSX.Element {
  const [fundState, dispatch] = useReducer(fundStateReducer, initialFundState);

  const lockedSlider = Object.values(fundState).find(
    (thisFundState) => thisFundState.locked
  );
  const unlockedSlidersInnerMax =
    100 - (lockedSlider?.allocationPercentage ?? 0);

  const [investedAmount, setInvestedAmount] = useState(20000);
  const [submittedInvestedAmount, setSubmittedInvestedAmount] =
    useState(investedAmount);

  const [isCalculated, setIsCalculated] = useState(false);

  const calculate = () => {
    setIsCalculated(true);
  };

  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (isChartVisible && !isFooterVisible) {
      const timeout = setTimeout(() => setIsFooterVisible(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isChartVisible]);

  const [isGreatResult, setIsGreatResult] = useState(false);

  return (
    <div className="px-4 sm:px-8 overflow-hidden">
      <ToolHeader
        title="Bogleheads Growth Calculator"
        description={`Find out what three-fund portfolio could give you the best returns over the past ${SPAN_IN_YEARS} years.`}
        gradientClassName="from-yellow via-orange to-red"
      />

      <main className="mx-auto mt-10 sm:mt-14 max-w-7xl">
        <MotionConfig transition={{ type: "spring", duration: 1 }}>
          <AnimateSharedLayout>
            <motion.div
              layout={true}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="z-10 relative p-6 md:p-12 rounded-lg md:rounded-2xl bg-gray-900"
            >
              <div
                className={classNames(
                  "absolute inset-x-0 bottom-0 h-3/4 rounded-lg md:rounded-2xl bg-gradient-to-b from-gray-900 to-black transition-opacity duration-500",
                  isChartVisible ? "" : "opacity-0"
                )}
              />
              <motion.form
                layout={true}
                className="z-10 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <Select
                    options={fundOptions[FundType.STOCK]}
                    selectedOption={fundState[FundType.STOCK].fund}
                    onChange={(option) =>
                      dispatch({
                        fundType: FundType.STOCK,
                        type: "setFund",
                        fund: option,
                      })
                    }
                    label="Total US Stock Market"
                    icon={
                      <div
                        className={classNames(
                          "w-1 h-4 rounded-full",
                          fundColors[FundType.STOCK].bg
                        )}
                      />
                    }
                  />
                  <div className="mt-6 flex lg:items-center h-12 px-3">
                    <div className="flex-1">
                      <Slider
                        variant={SliderVariant.Teal}
                        value={fundState[FundType.STOCK].allocationPercentage}
                        setValue={(value) =>
                          dispatch({
                            fundType: FundType.STOCK,
                            type: "setAllocationPercentage",
                            allocationPercentage: value,
                          })
                        }
                        min={0}
                        max={100}
                        innerMax={
                          fundState[FundType.STOCK].locked
                            ? undefined
                            : unlockedSlidersInnerMax
                        }
                        disabled={fundState[FundType.STOCK].locked}
                        displayValue={true}
                        displayValueFormat={(value) => `${value}%`}
                        displayTooltip={true}
                        onDragEnd={() =>
                          dispatch({
                            fundType: FundType.STOCK,
                            type: "submitAllocationPercentage",
                          })
                        }
                      />
                    </div>
                    <Tooltip
                      content={
                        fundState[FundType.STOCK].locked ? "Unlock" : "Lock"
                      }
                    >
                      <button
                        type="button"
                        className={classNames(
                          "ml-2 -mr-2 -my-2 flex justify-center items-center w-9 h-9 flex-0 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50",
                          fundState[FundType.STOCK].locked
                            ? "text-gray-400"
                            : "text-gray-100",
                          "hover:text-white"
                        )}
                        aria-label={
                          fundState[FundType.STOCK].locked ? "Unlock" : "Lock"
                        }
                        onClick={() =>
                          dispatch({
                            fundType: FundType.STOCK,
                            type: "toggleLocked",
                          })
                        }
                      >
                        <LockIcon
                          size={20}
                          className=""
                          locked={fundState[FundType.STOCK].locked}
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <Select
                    options={fundOptions[FundType.INTERNATIONAL_STOCK]}
                    selectedOption={
                      fundState[FundType.INTERNATIONAL_STOCK].fund
                    }
                    onChange={(option) =>
                      dispatch({
                        fundType: FundType.INTERNATIONAL_STOCK,
                        type: "setFund",
                        fund: option,
                      })
                    }
                    label="Total International Stock"
                    icon={
                      <div
                        className={classNames(
                          "w-1 h-4 rounded-full",
                          fundColors[FundType.INTERNATIONAL_STOCK].bg
                        )}
                      />
                    }
                  />
                  <div className="mt-6 flex lg:items-center h-12 px-3">
                    <div className="flex-1">
                      <Slider
                        variant={SliderVariant.Blue}
                        value={
                          fundState[FundType.INTERNATIONAL_STOCK]
                            .allocationPercentage
                        }
                        setValue={(value) =>
                          dispatch({
                            fundType: FundType.INTERNATIONAL_STOCK,
                            type: "setAllocationPercentage",
                            allocationPercentage: value,
                          })
                        }
                        min={0}
                        max={100}
                        innerMax={
                          fundState[FundType.INTERNATIONAL_STOCK].locked
                            ? undefined
                            : unlockedSlidersInnerMax
                        }
                        disabled={
                          fundState[FundType.INTERNATIONAL_STOCK].locked
                        }
                        displayValue={true}
                        displayValueFormat={(value) => `${value}%`}
                        displayTooltip={true}
                        onDragEnd={() =>
                          dispatch({
                            fundType: FundType.INTERNATIONAL_STOCK,
                            type: "submitAllocationPercentage",
                          })
                        }
                      />
                    </div>
                    <Tooltip
                      content={
                        fundState[FundType.INTERNATIONAL_STOCK].locked
                          ? "Unlock"
                          : "Lock"
                      }
                    >
                      <button
                        type="button"
                        className={classNames(
                          "ml-2 -mr-2 -my-2 flex justify-center items-center w-9 h-9 flex-0 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50",
                          fundState[FundType.INTERNATIONAL_STOCK].locked
                            ? "text-gray-400"
                            : "text-gray-100",
                          "hover:text-white"
                        )}
                        aria-label={
                          fundState[FundType.INTERNATIONAL_STOCK].locked
                            ? "Unlock"
                            : "Lock"
                        }
                        onClick={() =>
                          dispatch({
                            fundType: FundType.INTERNATIONAL_STOCK,
                            type: "toggleLocked",
                          })
                        }
                      >
                        <LockIcon
                          size={20}
                          className=""
                          locked={
                            fundState[FundType.INTERNATIONAL_STOCK].locked
                          }
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <Select
                    options={fundOptions[FundType.BOND]}
                    selectedOption={fundState[FundType.BOND].fund}
                    onChange={(option) =>
                      dispatch({
                        fundType: FundType.BOND,
                        type: "setFund",
                        fund: option,
                      })
                    }
                    label="Total Bond Market"
                    icon={
                      <div
                        className={classNames(
                          "w-1 h-4 rounded-full",
                          fundColors[FundType.BOND].bg
                        )}
                      />
                    }
                  />
                  <div className="mt-6 flex lg:items-center h-12 px-3">
                    <div className="flex-1">
                      <Slider
                        variant={SliderVariant.Purple}
                        value={fundState[FundType.BOND].allocationPercentage}
                        setValue={(value) =>
                          dispatch({
                            fundType: FundType.BOND,
                            type: "setAllocationPercentage",
                            allocationPercentage: value,
                          })
                        }
                        min={0}
                        max={100}
                        innerMax={
                          fundState[FundType.BOND].locked
                            ? undefined
                            : unlockedSlidersInnerMax
                        }
                        disabled={fundState[FundType.BOND].locked}
                        displayValue={true}
                        displayValueFormat={(value) => `${value}%`}
                        displayTooltip={true}
                        onDragEnd={() =>
                          dispatch({
                            fundType: FundType.BOND,
                            type: "submitAllocationPercentage",
                          })
                        }
                      />
                    </div>
                    <Tooltip
                      content={
                        fundState[FundType.BOND].locked ? "Unlock" : "Lock"
                      }
                    >
                      <button
                        type="button"
                        className={classNames(
                          "ml-2 -mr-2 -my-2 flex justify-center items-center w-9 h-9 flex-0 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50",
                          fundState[FundType.BOND].locked
                            ? "text-gray-400"
                            : "text-gray-100",
                          "hover:text-white"
                        )}
                        aria-label={
                          fundState[FundType.BOND].locked ? "Unlock" : "Lock"
                        }
                        onClick={() =>
                          dispatch({
                            fundType: FundType.BOND,
                            type: "toggleLocked",
                          })
                        }
                      >
                        <LockIcon
                          size={20}
                          className=""
                          locked={fundState[FundType.BOND].locked}
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <InputCurrency
                    label="Invested Amount"
                    value={investedAmount}
                    allowNegative={false}
                    min={MIN_INVESTED_AMOUNT}
                    max={MAX_INVESTED_AMOUNT}
                    onValueChange={(value) => setInvestedAmount(value)}
                    onBlur={() => setSubmittedInvestedAmount(investedAmount)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSubmittedInvestedAmount(investedAmount);
                        if (!isCalculated) {
                          calculate();
                        }
                      }
                    }}
                  />
                  <div className="mt-6">
                    {!isCalculated ? (
                      <Button type="submit" onClick={calculate}>
                        Calculate
                      </Button>
                    ) : (
                      <div className="flex lg:items-center h-12 px-3">
                        <div className="flex-1">
                          <Slider
                            variant={SliderVariant.White}
                            value={investedAmount}
                            setValue={(value) => setInvestedAmount(value)}
                            min={MIN_INVESTED_AMOUNT}
                            max={MAX_INVESTED_AMOUNT}
                            interpolator={investedAmountInterpolator}
                            onDragEnd={() =>
                              setSubmittedInvestedAmount(investedAmount)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.form>

              <AnimatePresence>
                {isCalculated && (
                  <motion.div
                    layout={true}
                    initial={{ height: 0, marginBottom: 0 }}
                    animate={{ height: "auto", marginBottom: -12 }}
                    className={classNames(
                      "-mx-3 sm:mx-0 relative",
                      !isChartVisible ? "overflow-hidden" : ""
                    )}
                  >
                    <div className="pt-6 lg:pt-10 sm:pb-3">
                      <Results
                        fundState={fundState}
                        investedAmount={submittedInvestedAmount}
                        onChartData={(chartData: ChartData) => {
                          setIsChartVisible(true);
                          setIsGreatResult(
                            chartData.percentageReturn >=
                              GREAT_RESULT_MIN_PERCENTAGE_RETURN &&
                              GREAT_RESULT_RISK_LEVELS.includes(
                                chartData.riskLevel
                              )
                          );
                        }}
                        onResetFunds={() => {
                          dispatch({
                            type: "resetFunds",
                          });
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {!isCalculated && (
                <motion.div
                  layout={true}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, y: -260, scale: 0.95 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
                    <TipCard
                      title="Diversified"
                      icon={<BranchIcon className="bg-orange text-orange" />}
                    >
                      You’ve heard the saying, “Don’t put all your eggs in one
                      basket.” That’s the essence of diversification. And while
                      at the surface there doesn’t look to be a lot of
                      diversification in a three-fund portfolio — each of these
                      funds is comprised of thousands of securities in their
                      universe. Which maximizes growth and limits your portfolio
                      risk.
                    </TipCard>
                    <TipCard
                      title="Simple"
                      icon={<FocusIcon className="bg-red text-red" />}
                    >
                      The thought of building a diversified portfolio can be
                      overwhelming to most people. But the three-fund portfolio
                      acts as a simple solution to squash that anxiety. You
                      don’t have to be an expert or spend a lot of time with
                      maintenance to yield maximum results. And it provides
                      sufficient diversification to minimize risk.
                    </TipCard>
                    <TipCard
                      title="Cheap"
                      icon={<CoinsIcon className="bg-teal text-teal" />}
                    >
                      Everything has a price. But a high price tag has little to
                      do with high performance. Investment fees are often the
                      most critical factor that determines long-term growth. And
                      using index funds for the three-fund portfolio makes it
                      surprisingly cost-effective. This means you get to keep
                      more of the returns in the long run.
                    </TipCard>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isFooterVisible && (
                <motion.div
                  layout={true}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="-mt-4"
                >
                  <div className="sm:px-6 md:px-12">
                    <EarlyAccessFooter />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimateSharedLayout>
        </MotionConfig>
      </main>

      {isGreatResult && (
        <Confetti
          amount={50}
          respawn={false}
          drag={0}
          gravity={-0.01}
          sway={0}
          flutter={0}
          rotate={false}
          extendGenerateParticle={extendGenerateParticleRocket}
          renderParticle={renderParticleRocket}
        />
      )}

      {isChartVisible && <FeedbackWidget />}
    </div>
  );
}
