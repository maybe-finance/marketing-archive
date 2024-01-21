import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { DateTime } from "luxon";
import { motion, AnimateSharedLayout } from "framer-motion";
import { ToolHeader } from "../../components/tool";
import { TipCard } from "../../components/tip-card";
import { InputCurrency } from "../../components/inputs";
import { Button } from "../../components/button";
import { Select, SelectableOption } from "../../components/select";
import {
  AmazonIcon,
  AmericanAirlinesIcon,
  AppleIcon,
  BitcoinIcon,
  BPLogoIcon,
  CarnivalCorpIcon,
  ChevronCorpIcon,
  CoinsIcon,
  DiscoveryIcon,
  ExxonMobileIcon,
  EyeIcon,
  GoogleIcon,
  NetgearIcon,
  ScaleIcon,
  SixFlagsIcon,
  SP500Icon,
  TeslaIcon,
} from "../../components/icons";
import {
  DatePicker,
  DateUtilsConfig,
  ParsedDateResponse,
} from "../../components/date-picker";
import EarlyAccessFooter from "../../components/EarlyAccessFooter";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Results from "./Results";
import axios from "axios";
import { ChartData, getChartData, getForecastedChartData } from "./lib";

const tickers: SelectableOption[] = [
  {
    value: "AAL",
    label: "American Airlines",
    icon: <AmericanAirlinesIcon />,
  },
  {
    value: "AAPL",
    label: "Apple",
    icon: <AppleIcon />,
  },
  {
    value: "AMZN",
    label: "Amazon",
    icon: <AmazonIcon />,
  },
  {
    value: "BP",
    icon: <BPLogoIcon />,
  },
  {
    value: "BTCUSD",
    label: "BTC",
    icon: <BitcoinIcon />,
  },
  {
    value: "CCL",
    label: "Carnival Corp",
    icon: <CarnivalCorpIcon />,
  },
  {
    value: "CVX",
    label: "Chevron Corp.",
    icon: <ChevronCorpIcon />,
  },
  {
    value: "DISCK",
    label: "Discovery Inc.",
    icon: <DiscoveryIcon />,
  },
  {
    value: "GOOGL",
    label: "Google",
    icon: <GoogleIcon />,
  },
  {
    value: "NTGR",
    label: "Netgear Inc.",
    icon: <NetgearIcon />,
  },
  {
    value: "SPX",
    label: "S&P 500",
    icon: <SP500Icon />,
  },
  {
    value: "SIX",
    label: "Six Flags",
    icon: <SixFlagsIcon />,
  },
  {
    value: "TSLA",
    label: "Tesla",
    icon: <TeslaIcon />,
  },
  {
    value: "XOM",
    label: "Exxon Mobile",
    icon: <ExxonMobileIcon />,
  },
];

const MONTHS_PRIOR_TO_SHOW_FORECAST = 12; // Per ENG-1, show forecast when user selects date within last year
const FORECAST_DURATION = 12;

export default function Home(): JSX.Element {
  const defaultMinDate = DateTime.fromObject({ year: 2009 });
  const defaultMaxDate = DateTime.now().minus({ months: 1 });
  const defaultDatetime = DateTime.now().minus({ year: 1 });

  const defaultDate = {
    rawValue: defaultDatetime,
    displayValue: defaultDatetime.toFormat("MMM yyyy"),
  };

  const [selectedTicker, setSelectedTicker] = useState(tickers[0]);
  const [amountSpent, setAmountSpent] = useState(25000);
  const [purchaseDate, setPurchaseDate] =
    useState<ParsedDateResponse>(defaultDate);
  const [submitted, setSubmitted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lineGraphData, setLineGraphData] = useState<ChartData>();
  const [showForecast, setShowForecast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [datePickerConfig, setDatepickerConfig] = useState<DateUtilsConfig>({
    minDate: defaultMinDate,
    maxDate: defaultMaxDate,
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    if (purchaseDate && selectedTicker && amountSpent) {
      setIsCalculating(true);
      axios(`/api/equity_prices/${selectedTicker.value}?interval=month`, {
        cancelToken: source.token,
      })
        .then((d) => {
          let chartData: ChartData;

          if (d.data.rows.length < 1) {
            throw new Error("No data to display");
          }

          const minDate = DateTime.fromISO(d.data.rows[0].date)
            .plus({
              months: 1,
            })
            .endOf("month");

          setDatepickerConfig({ minDate, maxDate: defaultMaxDate });

          // If user selects asset with 20 years of history and then one with 10 years, need to update purchaseDate
          if (minDate.toISO() > purchaseDate.rawValue.toISO()) {
            const newDate = {
              rawValue: minDate,
              displayValue: minDate.toFormat("MMM yyyy"),
            };
            setPurchaseDate(newDate);
            return;
          }

          if (
            purchaseDate.rawValue.endOf("month").toMillis() >
            DateTime.now()
              .endOf("month")
              .minus({ months: MONTHS_PRIOR_TO_SHOW_FORECAST })
              .toMillis()
          ) {
            chartData = getForecastedChartData(
              d.data,
              amountSpent,
              purchaseDate.rawValue,
              FORECAST_DURATION
            );

            setShowForecast(true);
          } else {
            chartData = getChartData(
              d.data,
              amountSpent,
              purchaseDate.rawValue,
              DateTime.now()
            );
            setShowForecast(false);
          }

          setTimeout(() => {
            setErrorMessage("");
            setLineGraphData(chartData);
            setIsCalculating(false);
          }, 1300); // Avoid flashing on fast networks
        })
        .catch(() => {
          if (isMounted) {
            setLineGraphData(undefined);
            setIsCalculating(false);
            setErrorMessage(
              "Oops!  We're having a hard time fetching that asset right now... Try another?"
            );
          }
        });
    }

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [selectedTicker, purchaseDate, amountSpent]);

  return (
    <div className="px-4 pb-24 text-white bg-black">
      <ToolHeader
        title="FOMO Calculator"
        description="That $100k Land Rover you bought a few years ago. What if you had put it in to AAPL instead?"
        gradientClassName="from-pink-600 to-purple-600"
      />
      <ErrorBoundary>
        <main
          className={classNames(
            "mt-10 sm:mt-14",
            submitted ? "max-w-6xl" : "max-w-4xl",
            "mx-auto flex items-start gap-16 flex-wrap md:flex-nowrap"
          )}
        >
          <AnimateSharedLayout>
            <section
              className={classNames(
                submitted
                  ? "rounded-2xl bg-gradient-to-b from-gray-900 to-black"
                  : "rounded-lg bg-gray-900",
                "z-10", // Ensures this is on top of background swoop
                "w-full md:w-1/2 flex-grow p-5 md:p-10"
              )}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout={true}
                className={classNames(
                  submitted && "md:flex-row md:items-end",
                  "flex flex-col"
                )}
              >
                <motion.div layout className={classNames("flex-1 mt-8")}>
                  <InputCurrency
                    label="How much did you spend?"
                    allowNegative={false}
                    value={amountSpent}
                    onValueChange={(value) => setAmountSpent(value)}
                  />
                </motion.div>

                <motion.div
                  layout
                  className={classNames(
                    "flex-1",
                    submitted ? "mt-8 md:ml-5" : "mt-8"
                  )}
                >
                  <DatePicker
                    config={datePickerConfig}
                    value={purchaseDate}
                    valueChanged={(purchaseDate) =>
                      setPurchaseDate(purchaseDate)
                    }
                    label="When did you buy this?"
                  />
                </motion.div>

                <motion.div
                  layout
                  className={classNames(
                    "flex-1 mt-8",
                    submitted ? "mt-8 md:ml-5" : "mt-8"
                  )}
                >
                  <Select
                    options={tickers}
                    selectedOption={selectedTicker}
                    onChange={(option) => setSelectedTicker(option)}
                    label="What could you have bought instead?"
                  />
                </motion.div>
                {!submitted && (
                  <motion.div
                    layout
                    className={classNames(
                      "flex-1",
                      submitted ? "mt-8 md:ml-8" : "mt-8"
                    )}
                  >
                    <Button onClick={() => setSubmitted(true)}>
                      Calculate
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {submitted && (
                <motion.div
                  className="px-2 pt-5 mt-8 overflow-hidden bg-black rounded-lg md:px-10 md:pt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ErrorBoundary>
                    <div className="relative">
                      <div
                        className={classNames(
                          "z-10 absolute inset-0 flex justify-center items-center rounded-lg bg-black bg-opacity-80 transition-opacity duration-500",
                          isCalculating ? "opacity-100" : "opacity-0 invisible"
                        )}
                      >
                        <div className="flex items-center justify-center h-full transform -translate-y-8">
                          <p className="text-xl font-extrabold font-display md:text-2xl leading-heading">
                            Calculating...
                          </p>
                        </div>
                      </div>
                      {errorMessage ? (
                        <div className="flex items-center justify-center h-48">
                          <h2 className="text-xl font-extrabold text-center md:text-2xl leading-heading">
                            {errorMessage}
                          </h2>
                        </div>
                      ) : (
                        <Results
                          lineGraphData={lineGraphData}
                          isCalculating={isCalculating}
                          isForecast={showForecast}
                          assetName={
                            selectedTicker.label
                              ? selectedTicker.label
                              : selectedTicker.value
                          }
                          forecastDuration={FORECAST_DURATION}
                        />
                      )}
                    </div>
                  </ErrorBoundary>
                  <div className="mt-48">
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
              className="flex-grow w-1/2"
            >
              <div className="flex flex-col gap-4">
                <TipCard
                  title="This or that?"
                  className="z-0"
                  icon={<ScaleIcon className="bg-teal text-teal" />}
                >
                  The power of opportunity cost is realizing that one decision
                  will simultaneously cancel out an opportunity to invest your
                  resources somewhere else. Understanding this can help you make
                  better decisions — by considering which option will bring you
                  a more desirable result.
                </TipCard>
                <TipCard
                  title="Seen and unseen"
                  className="z-0"
                  icon={<EyeIcon className="bg-red text-red" />}
                >
                  In terms of trade-offs, we typically focus on the ones we can
                  clearly see; time for money, rent for housing, etc. But there
                  is another layer of costs called implicit costs which are
                  typically unseen (and often hard to measure). By assessing
                  alternative uses of your money you can help uncover these
                  unforeseen expenses.
                </TipCard>
                <TipCard
                  title="More than money"
                  className="z-0"
                  icon={<CoinsIcon className="bg-blue text-blue" />}
                >
                  The biggest trade-offs we encounter often have nothing to do
                  with our finances. And instead, lean heavily towards the
                  non-financial areas of life, like our happiness levels. Or
                  fulfillment from your work. It&lsquo;s important to factor in
                  these long-term measures when deciding where to invest both
                  your time and money.
                </TipCard>
              </div>
            </motion.section>
          )}
        </main>
        {submitted}
      </ErrorBoundary>
    </div>
  );
}
