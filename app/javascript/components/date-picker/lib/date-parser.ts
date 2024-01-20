import * as P from "parsimmon";
import { DateTime } from "luxon";

/**
 * This date parser accepts the following formats:
 *
 * m(-/ )yy (ex: 1-19, 1/19, 1 19)
 * m(-/ )yyyy (ex: 1-2019, 1/2019, 1 2019)
 * mm(-/ )yy (ex: 01-19, 01/19, 01 19)
 * mm(-/ )yyyy (ex: 01-2019, 01/2019, 01 2019)
 * mmm yyyy (ex: Jan 2019)
 * mmmm yyyy (ex: January 2019)
 *
 * If the user input does not match one of these formats, the
 * current month and year (or max/min date if applicable) is returned.
 *
 */

interface StringKeys<T> {
  [key: string]: T;
}

interface ParserGuess {
  monthIndex?: number;
  year?: number;
}

const months: StringKeys<number> = {
  j: 1,
  ja: 1,
  jan: 1,
  janu: 1,
  janua: 1,
  januar: 1,
  january: 1,
  f: 2,
  fe: 2,
  feb: 2,
  febr: 2,
  febru: 2,
  februa: 2,
  februar: 2,
  february: 2,
  m: 3,
  ma: 3,
  mar: 3,
  marc: 3,
  march: 3,
  a: 4,
  ap: 4,
  apr: 4,
  apri: 4,
  april: 4,
  may: 5,
  ju: 6,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  au: 8,
  aug: 8,
  augu: 8,
  augus: 8,
  august: 8,
  s: 9,
  se: 9,
  sep: 9,
  sept: 9,
  septe: 9,
  septem: 9,
  septemb: 9,
  septembe: 9,
  september: 9,
  o: 10,
  oc: 10,
  oct: 10,
  octo: 10,
  octob: 10,
  octobe: 10,
  october: 10,
  n: 11,
  no: 11,
  nov: 11,
  nove: 11,
  novem: 11,
  novemb: 11,
  novembe: 11,
  november: 11,
  d: 12,
  de: 12,
  dec: 12,
  dece: 12,
  decem: 12,
  decemb: 12,
  decembe: 12,
  december: 12,
};

// =============================================
// Base Parsers
// =============================================

const Lang = P.createLanguage({
  Number: function () {
    return P.regexp(/[0-9]+/).map(Number);
  },
  String: function () {
    return P.regexp(/[a-zA-Z]+/).map((str: string) => str.toLowerCase());
  },
});

const delimiter = (): P.Parser<string[]> => {
  return P.oneOf(",-/ . ").many();
};

const whitespace = (): P.Parser<string> => {
  return P.regex(/\s*/);
};

/**
 * When a user inputs a two digit year, guessing the full year they are searching for
 * requires us to know what the current year is.  If the current year is 2021 and the
 * user types "25", we can reasonably assume they are looking for the year 2025.  But if
 * the user types "76", how do we decide whether they want 1976 or 2076?
 *
 * This function will find the closest full year to the user's input based on the current year.
 */
const guessTwoDigitYear: (twoDigitYear: number) => number = (twoDigitYear) => {
  const now = DateTime.now();
  const currentYear = now.toFormat("yyyy");

  const currentCentury = +(currentYear.substring(0, 2) + "00");
  const priorCentury = currentCentury - 100;
  const nextCentury = currentCentury + 100;

  // Ex: If user inputs "21" and current year is 2021, we get [2021, 1921, 3021]
  const possibleYears = [
    currentCentury + twoDigitYear,
    priorCentury + twoDigitYear,
    nextCentury + twoDigitYear,
  ];

  const closestGuess = possibleYears.reduce((prev, curr) => {
    return Math.abs(curr - +currentYear) < Math.abs(prev - +currentYear)
      ? curr
      : prev;
  });

  return closestGuess;
};

/**
 * Parses a year input
 *
 * Examples:
 * "2019" ==> "2019"
 * "201" ==> "2010"
 * "19" ==> "2019"
 * "98" ==> "1998"
 */
const yearParser = (): P.Parser<number> => {
  return Lang.Number.chain((n) => {
    if (n >= 0 && n <= 99) {
      const result = guessTwoDigitYear(n);
      return P.succeed(result);
    } else if (n > 99 && n <= 999) {
      // Example: If user has typed "202", guess "2020"
      return P.succeed(+(n.toString() + "0"));
    } else if (n > 999 && n <= 9999) {
      return P.succeed(n);
    } else {
      return P.fail("Invalid year");
    }
  });
};

/**
 * Parses a month string, and returns its index
 *
 * Examples:
 * "aug" ==> 8
 * "fe" ==> 2
 * "march" ==> 3
 */
const monthStringParser = (): P.Parser<number> => {
  return Lang.String.chain((monthSubstring: string) => {
    const monthIndex = months[monthSubstring];

    if (monthIndex) {
      return P.succeed(monthIndex);
    } else {
      return P.fail("Invalid month string");
    }
  });
};

/**
 * Parses a month number, and returns its index
 *
 * Examples:
 * 08 ==> 8
 * 8 ==> 8
 */
const monthNumberParser = (): P.Parser<number> => {
  return Lang.Number.chain((monthIndex: number) => {
    if (monthIndex >= 1 && monthIndex <= 12) {
      return P.succeed(monthIndex);
    } else {
      return P.fail("Invalid month number");
    }
  });
};

// =============================================
// Combination parsers
// =============================================

/**
 * Parses month string and year with delimiter and returns prediction
 *
 * Examples:
 * "jan 2019" ==> { month: 1, year: 2019 }
 * "february 2018" ==> { month: 2, year: 2018 }
 * "d 19" ==> { month: 12, year: 2019 }
 */
const monthTextPlusYear = (): P.Parser<ParserGuess> => {
  return P.seq(
    monthStringParser(),
    delimiter(),
    yearParser(),
    whitespace()
  ).map((items) => {
    return {
      monthIndex: items[0],
      year: items[2],
    };
  });
};

/**
 * Parses month number and year with delimiter and returns prediction
 *
 * Examples:
 * "02 19" ==> { month: 2, year: 2019 }
 * "1/2019" ==> { month: 1, year: 2019 }
 * "01-17" ==> { month: 1, year: 2017 }
 */
const monthNumberPlusYear = (): P.Parser<ParserGuess> => {
  return P.seq(
    monthNumberParser(),
    delimiter(),
    yearParser(),
    whitespace()
  ).map((items) => {
    return {
      monthIndex: items[0],
      year: items[2],
    };
  });
};

const monthNumberOnly = (): P.Parser<ParserGuess> => {
  return P.seq(monthNumberParser(), delimiter()).map(
    ([monthIndex]: [number, string[]]) => {
      return {
        monthIndex,
      };
    }
  );
};

const monthStringOnly = (): P.Parser<ParserGuess> => {
  return P.seq(monthStringParser(), delimiter()).map(
    ([monthIndex]: [number, string[]]) => {
      return {
        monthIndex,
      };
    }
  );
};

const yearOnly = (): P.Parser<ParserGuess> => {
  return P.seq(yearParser(), delimiter()).map(([year]: [number, string[]]) => {
    return {
      year,
    };
  });
};

/**
 * Chain the parsers together from most complex ==> least complex
 *
 * The first successful match will return, so order matters:
 * https://github.com/jneen/parsimmon/blob/master/API.md#parsimmonaltp1-p2-pn
 *
 */
const mainParser = (): P.Parser<ParserGuess> => {
  return P.alt(
    monthTextPlusYear(),
    monthNumberPlusYear(),
    monthNumberOnly(),
    monthStringOnly(),
    yearOnly()
  );
};

// =============================================
// API function
// =============================================

export interface DateParserResult {
  day: number;
  month: number;
  year: number;
  warningMsg?: string;
}

export const parseInput = (userInput: string): DateParserResult => {
  const result: P.Result<ParserGuess> = mainParser().parse(userInput);

  // This parser currently does not guess day, but adding to return value for future extension
  const DEFAULT_DAY_INDEX = 1;

  const defaultValue = {
    day: DEFAULT_DAY_INDEX,
    month: +DateTime.now().toFormat("M"),
    year: +DateTime.now().toFormat("y"),
    warningMsg: "No date found, returned current date",
  };

  if (!result.status) {
    return defaultValue;
  }

  const { monthIndex, year } = result.value;

  return {
    day: DEFAULT_DAY_INDEX,
    month: monthIndex ? monthIndex : defaultValue.month,
    year: year ? year : defaultValue.year,
  };
};
