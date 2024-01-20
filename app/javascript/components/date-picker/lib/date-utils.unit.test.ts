import { DateUtilsConfig, getDateUtils } from "./date-utils";
import { DateTime, Info } from "luxon";

const testConfig: DateUtilsConfig = {
  minDate: DateTime.fromObject({ year: 1977, month: 8, day: 15 }),
  maxDate: DateTime.fromObject({ year: 2023, month: 4, day: 15 }),
};

const utils = getDateUtils(testConfig);

describe("Date Utils Unit Tests", () => {
  it("Should return valid next display values", () => {
    const result = utils.getDisplayValueFromYear("next", 2002);
    const resultStringRange = utils.getDisplayValueFromYearRange(
      "next",
      "1990-1999"
    );

    const expected = {
      currentYear: "2003",
      currentYearRange: "2000-2009",
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
      months: Info.monthsFormat("short"),
    };

    expect(result).toEqual({ ...expected, currentYear: "2003" });
    expect(resultStringRange).toEqual({ ...expected, currentYear: "2000" });
  });

  it("Should return valid previous display values", () => {
    const result = utils.getDisplayValueFromYear("previous", 2002);
    const resultStringRange = utils.getDisplayValueFromYearRange(
      "previous",
      "2010-2019"
    );

    const expected = {
      currentYear: "2001",
      currentYearRange: "2000-2009",
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
      months: Info.monthsFormat("short"),
    };

    expect(result).toEqual({ ...expected, currentYear: "2001" });
    expect(resultStringRange).toEqual({ ...expected, currentYear: "2000" });
  });

  it("Should return valid next display values when decade changes", () => {
    const result = utils.getDisplayValueFromYear("next", 2009);

    const expected = {
      currentYear: "2010",
      currentYearRange: "2010-2019",
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      months: Info.monthsFormat("short"),
    };

    expect(result).toEqual({ ...expected, currentYear: "2010" });
  });

  it("Should return valid previous display values when decade changes", () => {
    const result = utils.getDisplayValueFromYear("previous", 2000);

    const expected = {
      currentYear: "1999",
      currentYearRange: "1990-1999",
      years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      months: Info.monthsFormat("short"),
    };

    expect(result).toEqual({ ...expected, currentYear: "1999" });
  });

  it("Should return max range when year greater than max year is selected", () => {
    const result = utils.getDisplayValueFromYear("next", 2023);
    const resultStringRange = utils.getDisplayValueFromYearRange(
      "next",
      "2020-2023"
    );

    const expected = {
      currentYear: "2023",
      currentYearRange: "2020-2023",
      years: [2020, 2021, 2022, 2023],
      months: ["Jan", "Feb", "Mar", "Apr"], // Since max date is in April, don't show past April
    };

    expect(result).toEqual({ ...expected, currentYear: "2023" });
    expect(resultStringRange).toEqual({
      ...expected,
      currentYear: "2020",
      months: Info.monthsFormat("short"),
    });
  });

  it("Should return min range when year less than min year is selected", () => {
    const result = utils.getDisplayValueFromYear("previous", 1977);
    const resultStringRange = utils.getDisplayValueFromYearRange(
      "previous",
      "1977-1979"
    );

    const expected = {
      currentYear: "1977",
      currentYearRange: "1977-1979",
      years: [1977, 1978, 1979],
      months: ["Aug", "Sep", "Oct", "Nov", "Dec"], // Since min date is in Aug, don't show past before Aug
    };

    expect(result).toEqual({ ...expected, currentYear: "1977" });
    expect(resultStringRange).toEqual({ ...expected, currentYear: "1977" });
  });
});
