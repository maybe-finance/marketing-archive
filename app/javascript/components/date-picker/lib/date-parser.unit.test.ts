import { DateTime } from "luxon";
import { parseInput, DateParserResult } from "./date-parser";

function testStrings(strList: string[]): DateParserResult[] {
  const results = [];

  for (let i = 0; i < strList.length; i++) {
    results.push(parseInput(strList[i]));
  }

  return results;
}

const DEFAULT_DAY = 1;

const defaultValue = {
  day: DEFAULT_DAY,
  month: +DateTime.now().toFormat("M"),
  year: +DateTime.now().toFormat("y"),
  warningMsg: "No date found, returned current date",
};

describe("Date Parser Unit Tests", () => {
  it("Parses all basic numeric formats", () => {
    const numericTestInputs = [
      "2/98",
      "2-98",
      "2 98",
      "02/98",
      "02-98",
      "02 98",
      "2/1998",
      "2-1998",
      "2 1998",
      "02/1998",
      "02-1998",
      "02 1998",
    ];
    const results = testStrings(numericTestInputs);

    expect(results[0]).toEqual({
      day: DEFAULT_DAY,
      month: 2,
      year: 1998,
    });

    // All strings should yield the same result
    for (let i = 0; i < results.length; i++) {
      expect(results[0]).toEqual(results[i]);
    }
  });

  it("Parses various string formats", () => {
    const strTestInputs = [
      "J 07",
      "j 07",
      "jan 2007",
      "january 2007",
      "january 2007",
    ];
    const results = testStrings(strTestInputs);

    expect(results[0]).toEqual({
      day: DEFAULT_DAY,
      month: 1,
      year: 2007,
    });

    // All strings should yield the same result
    for (let i = 0; i < results.length; i++) {
      expect(results[0]).toEqual(results[i]);
    }
  });

  it("Returns a month and year even if no month is provided", () => {
    const result = parseInput("2018");
    expect(result.month).toEqual(defaultValue.month);
  });

  it("Returns a month and year even if no year is provided", () => {
    const result = parseInput("March");
    expect(result.year).toEqual(defaultValue.year);
  });

  it("Returns a default value for invalid inputs", () => {
    const results = testStrings([
      "aksljdflkja",
      "293fjsy0dfj",
      "aaaaaaaaa",
      "11111111",
    ]);

    expect(results[0]).toEqual(defaultValue);
  });

  it("Resolves inputs for all months, and provides default year if none provided", () => {
    const testCases = [
      "J",
      "Janu",
      "Fe",
      "Februar",
      "Mar",
      "april",
      "may",
      "june",
      "jul",
      "au",
      "se",
      "sept",
      "oc",
      "no",
      "de",
    ];

    const expectedYear = defaultValue.year;

    const expectedMonthIndex = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 11, 12];

    const results = testStrings(testCases);

    for (let i = 0; i < results.length; i++) {
      expect(results[i].month).toEqual(expectedMonthIndex[i]);
      expect(results[i].year).toEqual(expectedYear);
    }
  });

  it("Handles misc characters as inputs", () => {
    const result = parseInput("..$2$#(*#&@^$&$%!&");

    expect(result).toEqual(defaultValue);
  });
});
