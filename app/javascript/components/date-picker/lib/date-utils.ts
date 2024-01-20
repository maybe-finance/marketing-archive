import { DateTime, Info } from "luxon";
import { parseInput } from "./date-parser";

export type DayFormat = "short" | "long";
export type MonthFormat = DayFormat | "2-digit" | "numeric";
export type Direction = "next" | "previous" | "current";
export type DisplayMode = "year" | "year-range";
export enum ArrowKey {
  U = "up",
  D = "down",
  L = "left",
  R = "right",
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface DateUtilsConfig {
  minDate?: DateTime;
  maxDate?: DateTime;
  inputFormat?: string; // Any valid Luxon format - https://moment.github.io/luxon/#/formatting
  dayFormat?: DayFormat;
  monthFormat?: MonthFormat;
}

export interface ParsedDateResponse {
  rawValue: DateTime;
  displayValue: string;
  warningMsg?: string;
}

export interface DateCoordinate {
  newDate: ParsedDateResponse;
  newCoordinate: Coordinate;
}

export interface DateUtils {
  defaultDisplayValue: DatePickerDisplay;
  getDisplayValueFromYear: (
    direction: Direction,
    currentYear: number
  ) => DatePickerDisplay;
  getDisplayValueFromYearRange: (
    direction: Direction,
    currentYearRangeString: string
  ) => DatePickerDisplay;
  parseDateString: (userInput: string) => ParsedDateResponse;
  navigateYearByKeys: (
    arrowKeyPressed: ArrowKey,
    currentDate: DateTime,
    currentYearString: string,
    currentCoordinate: Coordinate
  ) => DateCoordinate;
  navigateMonthByKeys: (
    arrowKeyPressed: ArrowKey,
    currentDate: DateTime,
    currentCoordinate: Coordinate
  ) => DateCoordinate;
}

interface YearRange {
  startYear: number;
  endYear: number;
  years: number[];
  yearString: string;
}

export interface DatePickerDisplay {
  currentYear: string;
  currentYearRange: string;
  years: number[];
  months: string[];
}

const populateDecade = (start: number, end: number): number[] => {
  const yearRange = [];
  for (let i = 0; i < 10; i++) {
    if (start + i <= end) {
      yearRange.push(start + i);
    }
  }

  return yearRange;
};

// Returns an array of ranges.  Example: ["1990-1999", "2000-2009"]
const generateYearRanges = (minYear: number, maxYear: number): YearRange[] => {
  const ranges: YearRange[] = [];

  for (let i = minYear; i <= maxYear; i++) {
    const startOfDecade = Math.floor(i / 10) * 10;
    const endOfDecadeMinus1 = i % 10 === 0 ? i + 9 : Math.ceil(i / 10) * 10 - 1;

    const startYear = startOfDecade < minYear ? minYear : startOfDecade;
    const endYear = endOfDecadeMinus1 > maxYear ? maxYear : endOfDecadeMinus1;

    const yearString = `${startYear}-${endYear}`;

    const existsInRanges = ranges.find((r) => r.yearString === yearString);

    if (!existsInRanges) {
      const years = populateDecade(startYear, endYear);
      ranges.push({
        startYear,
        endYear,
        years,
        yearString,
      });
    }
  }

  return ranges;
};

const getRange = (
  ranges: YearRange[],
  currentIndex: number,
  direction: Direction
): YearRange => {
  switch (direction) {
    case "current":
      return ranges[currentIndex];
    case "next":
      return currentIndex + 1 < ranges.length
        ? ranges[currentIndex + 1]
        : ranges[currentIndex];
    case "previous":
      return currentIndex - 1 >= 0
        ? ranges[currentIndex - 1]
        : ranges[currentIndex];
  }
};

const getRangeByYear = (
  year: number,
  ranges: YearRange[],
  direction: Direction
) => {
  let rangeIndex = 0;

  for (let i = 0; i < ranges.length; i++) {
    if (year >= ranges[i].startYear && year <= ranges[i].endYear) {
      rangeIndex = i;
    }
  }

  const range = getRange(ranges, rangeIndex, direction);
  return range;
};

const getRangeByYearRangeString = (
  yearString: string,
  ranges: YearRange[],
  direction: Direction
) => {
  const rangeIndex = ranges.findIndex((r) => r.yearString === yearString);
  const range = getRange(ranges, rangeIndex, direction);
  return range;
};

const getNextYear = (currentYear: number, maxYear: number) => {
  if (currentYear + 1 > maxYear) {
    return { year: maxYear };
  } else {
    return { year: currentYear + 1 };
  }
};

const getPreviousYear = (currentYear: number, minYear: number) => {
  if (currentYear - 1 < minYear) {
    return { year: minYear };
  } else {
    return { year: currentYear - 1 };
  }
};

const getMonthsForYear = (
  year: number,
  minDate: DateTime,
  maxDate: DateTime,
  monthFormat: MonthFormat
): string[] => {
  const minYear = +minDate.toFormat("yyyy");
  const maxYear = +maxDate.toFormat("yyyy");
  const minDateMonth = +minDate.toFormat("M");
  const maxDateMonth = +maxDate.toFormat("M");

  const months = Info.monthsFormat(monthFormat);

  if (year === minYear) {
    return months.slice(minDateMonth - 1);
  }

  if (year === maxYear) {
    return months.slice(0, maxDateMonth);
  }

  return months;
};

const buildDisplay = (
  yearRange: YearRange,
  minDate: DateTime,
  maxDate: DateTime,
  monthFormat: MonthFormat,
  currentYear?: number
): DatePickerDisplay => {
  const months = getMonthsForYear(
    currentYear ? currentYear : yearRange.startYear,
    minDate,
    maxDate,
    monthFormat
  );

  return {
    currentYear: currentYear
      ? currentYear.toString()
      : yearRange.startYear.toString(),
    currentYearRange: yearRange.yearString,
    years: yearRange.years,
    months,
  };
};

const getMatrix = (content: string[]): string[][] => {
  const matrix = [];
  const MATRIX_WIDTH = 3;

  // Always a 3 col matrix
  for (let i = 0; i < content.length; i += MATRIX_WIDTH) {
    matrix.push(content.slice(i, MATRIX_WIDTH + i));
  }

  return matrix;
};

const navigateMatrix = (
  matrix: string[][],
  current: Coordinate,
  move: ArrowKey
): Coordinate => {
  const lastRowMatrix = matrix.length - 1;
  const lastColMatrix = matrix[lastRowMatrix].length - 1;
  const lastColCurrentRow = matrix[current.x].length - 1;
  const isFirstPoint = current.x === 0 && current.y === 0;
  const isLastPoint =
    current.x === lastRowMatrix && current.y === lastColMatrix;

  switch (move) {
    case ArrowKey.U:
      if (current.x === 0) {
        return current;
      } else {
        return { ...current, x: current.x - 1 };
      }
    case ArrowKey.D:
      if (current.x === lastRowMatrix) {
        return current;
      } else {
        return { ...current, x: current.x + 1 };
      }
    case ArrowKey.L:
      if (isFirstPoint) {
        return current;
      } else if (current.y === 0) {
        return { x: current.x - 1, y: matrix[current.x - 1].length - 1 };
      } else {
        return { ...current, y: current.y - 1 };
      }
    case ArrowKey.R:
      if (isLastPoint) {
        return current;
      } else if (current.y === lastColCurrentRow) {
        return { x: current.x + 1, y: 0 };
      } else {
        return { ...current, y: current.y + 1 };
      }
    default:
      return current;
  }
};

export const getDateUtils = (config: DateUtilsConfig = {}): DateUtils => {
  const DEFAULT_MIN_YEAR_OFFSET = 30;

  const defaultConfig = {
    minDate: DateTime.now().minus({ years: DEFAULT_MIN_YEAR_OFFSET }),
    maxDate: DateTime.now(),
    inputFormat: "MMM yyyy",
    dayFormat: "short",
    monthFormat: "short",
  };

  const _config = Object.assign({}, defaultConfig, config);

  const minYear = +_config.minDate.toFormat("yyyy");
  const maxYear = +_config.maxDate.toFormat("yyyy");

  const ranges = generateYearRanges(minYear, maxYear);

  const defaultRange = getRangeByYear(DateTime.now().year, ranges, "current");

  const sharedConfig: [DateTime, DateTime, MonthFormat] = [
    _config.minDate,
    _config.maxDate,
    _config.monthFormat,
  ];

  const defaultValue = buildDisplay(defaultRange, ...sharedConfig);

  const getDisplayValueFromYear = (
    direction: Direction,
    currentYear: number
  ) => {
    let newYear: { year: number; warningMsg?: string } = { year: currentYear };

    if (direction === "next") {
      newYear = getNextYear(currentYear, _config.maxDate.year);
    }

    if (direction === "previous") {
      newYear = getPreviousYear(currentYear, _config.minDate.year);
    }

    const range = getRangeByYear(newYear.year, ranges, "current");

    return buildDisplay(range, ...sharedConfig, newYear.year);
  };

  const getDisplayValueFromYearRange = (
    direction: Direction,
    currentYearRangeString: string
  ) => {
    const range = getRangeByYearRangeString(
      currentYearRangeString,
      ranges,
      direction
    );

    return buildDisplay(range, ...sharedConfig);
  };

  const parseDateString = (
    userInput: string | DateTime
  ): ParsedDateResponse => {
    const inputToParse =
      userInput instanceof DateTime
        ? userInput.toFormat("MMM yyyy")
        : userInput;

    const { day, month, year } = parseInput(inputToParse);
    const resultDate = DateTime.fromObject({ day, month, year });

    // We don't want to show user a warning message if they haven't typed their entire input yet
    const userHasTypedMonthAndYear = /.+ .+/.test(inputToParse);

    if (resultDate.toMillis() > _config.maxDate.toMillis()) {
      return {
        rawValue: _config.maxDate,
        displayValue: _config.maxDate.toFormat(_config.inputFormat),
        warningMsg: userHasTypedMonthAndYear
          ? `Max date allowed: ${_config.maxDate.toFormat(_config.inputFormat)}`
          : undefined,
      };
    }

    if (resultDate.endOf("month").toMillis() < _config.minDate.toMillis()) {
      return {
        rawValue: _config.minDate,
        displayValue: _config.minDate.toFormat(_config.inputFormat),
        warningMsg: userHasTypedMonthAndYear
          ? `Min date allowed: ${_config.minDate.toFormat(_config.inputFormat)}`
          : undefined,
      };
    }

    return {
      rawValue: resultDate,
      displayValue: resultDate.toFormat(_config.inputFormat),
    };
  };

  const navigateYearByKeys = (
    arrowKeyPressed: ArrowKey,
    currentDate: DateTime,
    currentYearString: string,
    currentCoordinate: Coordinate
  ): DateCoordinate => {
    const range = getRangeByYearRangeString(
      currentYearString,
      ranges,
      "current"
    );

    const display = buildDisplay(range, ...sharedConfig, currentDate.year);
    const matrix = getMatrix(display.years.map((y) => y.toString()));
    const newCoordinate = navigateMatrix(
      matrix,
      currentCoordinate,
      arrowKeyPressed
    );

    const newDate = parseDateString(
      `${currentDate.month} ${matrix[newCoordinate.x][newCoordinate.y]}`
    );

    return {
      newDate,
      newCoordinate,
    };
  };

  const navigateMonthByKeys = (
    arrowKeyPressed: ArrowKey,
    currentDate: DateTime,
    currentCoordinate: Coordinate
  ): DateCoordinate => {
    const range = getRangeByYear(currentDate.year, ranges, "current");
    const display = buildDisplay(range, ...sharedConfig, currentDate.year);
    const matrix = getMatrix(display.months);
    const newCoordinate = navigateMatrix(
      matrix,
      currentCoordinate,
      arrowKeyPressed
    );

    const newDate = parseDateString(
      `${matrix[newCoordinate.x][newCoordinate.y]} ${currentDate.year}`
    );

    return {
      newDate,
      newCoordinate,
    };
  };

  return {
    parseDateString,
    defaultDisplayValue: defaultValue,
    getDisplayValueFromYear,
    getDisplayValueFromYearRange,
    navigateYearByKeys,
    navigateMonthByKeys,
  };
};
