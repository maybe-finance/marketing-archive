import { getChartData } from "./historical-performance-utils";
import * as fs from "fs";
import * as path from "path";
import { DateTime } from "luxon";

function getMockData() {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/mock-historical-data.json"),
      "utf-8"
    )
  );
}

// Inputs used for all tests, can be validated against this Google Sheet
// https://docs.google.com/spreadsheets/d/132oJsfUIA9_Byyk4-OGJ7v306sjxCdZ0pREjSADf_wo/edit?usp=sharing
const data = getMockData();
const investmentDate = DateTime.fromObject({ year: 2021, month: 1, day: 18 }); // day should not matter here
const endInvestmentDate = DateTime.fromObject({
  year: 2021,
  month: 7,
  day: 15, // should not matter
});
const investmentAmount = 10000;

describe("FOMO Calculator Historical Performance Utils Unit Tests", () => {
  it("Calculates final investment values correctly", () => {
    const expectedActualEndValue = 11257.96; // from Google Sheet
    const expectedBestEndValue = expectedActualEndValue; // We decided to not show best/worst scenarios, so these are now all equal
    const expectedWorstEndValue = expectedActualEndValue; // We decided to not show best/worst scenarios, so these are now all equal

    const chartData = getChartData(
      data,
      investmentAmount,
      investmentDate,
      endInvestmentDate
    );
    const { series } = chartData;
    const finalIndex = series.length - 1;

    const actualValue = +chartData.currentInvestmentValue.toFixed(2);
    const bestValue = +series[finalIndex].max.value.toFixed(2);
    const worstValue = +series[finalIndex].min.value.toFixed(2);

    expect(actualValue).toEqual(expectedActualEndValue);
    expect(bestValue).toEqual(expectedBestEndValue);
    expect(worstValue).toEqual(expectedWorstEndValue);
  });

  // We ended up not using best/worst scenarios, but leaving here in case we change our mind later
  xit("Identifies best and worst periods correctly", () => {
    const bestPeriodStart = DateTime.fromObject({
      year: 2004,
      month: 8,
      day: 31,
    }).endOf("month");
    const bestPeriodEnd = DateTime.fromObject({
      year: 2005,
      month: 2,
      day: 28,
    }).endOf("month");
    const worstPeriodStart = DateTime.fromObject({
      year: 2008,
      month: 5,
      day: 31,
    }).endOf("month");
    const worstPeriodEnd = DateTime.fromObject({
      year: 2008,
      month: 11,
      day: 30,
    }).endOf("month");

    const chartData = getChartData(
      data,
      investmentAmount,
      investmentDate,
      endInvestmentDate
    );
    const { series } = chartData;
    const finalIndex = series.length - 1;

    expect(series[0].max.date).toEqual(bestPeriodStart);
    expect(series[finalIndex].max.date).toEqual(bestPeriodEnd);
    expect(series[0].min.date).toEqual(worstPeriodStart);
    expect(series[finalIndex].min.date).toEqual(worstPeriodEnd);
  });

  it("Calculates opportunity cost multiple correctly", () => {
    const chartData = getChartData(
      data,
      investmentAmount,
      investmentDate,
      endInvestmentDate
    );

    expect(+chartData.oppCostMultiple.toFixed(2)).toEqual(1.13);
  });
});
