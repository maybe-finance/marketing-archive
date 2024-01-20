import React, { useRef, useReducer, ElementRef } from "react";
import classNames from "classnames";
import { useOnOutsideEvent } from "../../hooks";
import { CalendarIcon } from "../icons";
import { SearchableSelect } from "../select";
import {
  getDateUtils,
  DateUtilsConfig,
  ParsedDateResponse,
  DatePickerDisplay,
  Direction,
  ArrowKey,
  Coordinate,
  DateCoordinate,
} from "./lib";
import { DropdownContainer } from "./DropdownContainer";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownContent } from "./DropdownContent";

export interface DatePickerProps {
  config: DateUtilsConfig;
  value: ParsedDateResponse;
  valueChanged: (value: ParsedDateResponse) => void;
  label?: string;
  tabIndex?: number;
}

enum View {
  DIV = "div",
  INPUT = "input",
  HEADER = "header",
  CONTENT = "content",
}

enum YearMode {
  SINGLE = "single-year",
  MULTI = "multi-year",
}

enum ContentMode {
  MONTH = "month",
  YEAR = "year",
}

type Action =
  | { type: "CLOSE" }
  | { type: "CLOSE_WITHOUT_UPDATE" }
  | { type: "OPEN" }
  | { type: "SET_WARNING"; payload: string }
  | { type: "SET_VIEW"; payload: View }
  | { type: "SET_HEADER"; payload: YearMode }
  | { type: "SET_DISPLAY"; payload: DatePickerDisplay }
  | { type: "SET_INPUT"; payload: string }
  | { type: "SET_DATE"; payload: ParsedDateResponse }
  | { type: "GUESS_DATE"; payload: ParsedDateResponse }
  | { type: "SET_CONTENT_MODE"; payload: ContentMode }
  | { type: "SET_COORDINATE"; payload: Coordinate };

interface DatePickerState {
  isExpanded: boolean;
  activeSection: View;
  yearMode: YearMode;
  contentMode: ContentMode;
  dateDisplay: DatePickerDisplay;
  selectedDate: ParsedDateResponse;
  inputValue: string;
  coordinate: Coordinate;
  warning: string;
}

const initialStatePartial: Partial<DatePickerState> = {
  isExpanded: false,
  activeSection: View.DIV,
  yearMode: YearMode.SINGLE,
  contentMode: ContentMode.MONTH,
  coordinate: { x: 0, y: 0 },
  warning: "",
};

const datePickerReducer = (
  state: DatePickerState,
  action: Action
): DatePickerState => {
  switch (action.type) {
    case "CLOSE_WITHOUT_UPDATE":
      return { ...state, isExpanded: false };
    case "CLOSE":
      return {
        ...state,
        ...initialStatePartial,
        inputValue: state.selectedDate.displayValue,
      };
    case "OPEN":
      return { ...state, isExpanded: true };
    case "SET_WARNING":
      return { ...state, warning: action.payload };
    case "SET_HEADER":
      return { ...state, yearMode: action.payload };
    case "SET_VIEW":
      return { ...state, activeSection: action.payload };
    case "SET_DISPLAY":
      return {
        ...state,
        dateDisplay: action.payload,
      };
    case "GUESS_DATE":
      return {
        ...state,
        inputValue: action.payload.displayValue,
        selectedDate: action.payload,
        warning: action.payload.warningMsg || "",
      };
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };
    case "SET_DATE":
      return {
        ...state,
        selectedDate: action.payload,
        warning: action.payload.warningMsg || "",
      };
    case "SET_CONTENT_MODE":
      return { ...state, contentMode: action.payload };
    case "SET_COORDINATE":
      return { ...state, coordinate: action.payload };

    default:
      throw new Error("Invalid Datepicker action");
  }
};

export function DatePicker({
  config,
  value,
  valueChanged,
  label,
  tabIndex,
}: DatePickerProps): JSX.Element {
  const dateUtils = getDateUtils(config);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ElementRef<typeof SearchableSelect>>(null);

  const [state, dispatch] = useReducer(datePickerReducer, {
    isExpanded: false,
    activeSection: View.INPUT,
    yearMode: YearMode.SINGLE,
    contentMode: ContentMode.MONTH,
    dateDisplay: dateUtils.defaultDisplayValue,
    selectedDate: value,
    inputValue: value.displayValue,
    coordinate: { x: 0, y: 0 },
    warning: "",
  });

  // Closes datepicker on Esc or outside click, guesses a value to always ensure a valid input when closed
  useOnOutsideEvent(datePickerRef, () => {
    const guessValue = dateUtils.parseDateString(
      state.selectedDate.displayValue
    );

    if (state.inputValue !== state.selectedDate.displayValue) {
      broadcastFinalValue(guessValue);
    } else {
      dispatch({ type: "CLOSE_WITHOUT_UPDATE" });
    }
  });

  function broadcastFinalValue(dateValue: ParsedDateResponse) {
    dispatch({ type: "CLOSE" });

    // Let the parent component know a final value has been selected
    valueChanged(dateValue);
  }

  function jumpIntoInput() {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      dispatch({ type: "SET_VIEW", payload: View.INPUT });
    }
  }

  function handleInputChange(value: string) {
    if (!state.isExpanded) {
      dispatch({ type: "OPEN" });
    }
    const parsedDate = dateUtils.parseDateString(value);
    refreshDisplay(parsedDate.rawValue.year);

    // Although dateParser will guess on each keystroke, let user keep typing without finalizing value
    dispatch({ type: "SET_INPUT", payload: value });
    dispatch({ type: "SET_DATE", payload: parsedDate });
  }

  function handleInputToggle() {
    // If the user is closing the input, set input to ensure valid date
    if (state.isExpanded) {
      broadcastFinalValue(state.selectedDate);
    } else {
      dispatch({ type: "OPEN" });
      jumpIntoInput();
    }
  }

  function handleContentSelect(val: string) {
    dispatch({ type: "SET_VIEW", payload: View.CONTENT });

    if (state.contentMode === ContentMode.MONTH) {
      const dateValue = dateUtils.parseDateString(
        `${val} ${state.selectedDate.rawValue.year}`
      );

      dispatch({ type: "GUESS_DATE", payload: dateValue });

      if (state.yearMode === YearMode.MULTI) {
        dispatch({ type: "SET_CONTENT_MODE", payload: ContentMode.YEAR });
      } else {
        broadcastFinalValue(dateValue);
      }
    } else {
      const dateValue = dateUtils.parseDateString(
        `${state.selectedDate.rawValue.month} ${val}`
      );
      const display = dateUtils.getDisplayValueFromYear(
        "current",
        dateValue.rawValue.year
      );

      dispatch({ type: "SET_DISPLAY", payload: display });
      dispatch({ type: "GUESS_DATE", payload: dateValue });
      broadcastFinalValue(dateValue);
    }
  }

  function handleHeaderNavigation(direction: Direction) {
    let newDisplay: DatePickerDisplay;

    if (state.yearMode === YearMode.MULTI) {
      newDisplay = dateUtils.getDisplayValueFromYearRange(
        direction,
        state.dateDisplay.currentYearRange
      );
    } else {
      newDisplay = dateUtils.getDisplayValueFromYear(
        direction,
        state.selectedDate.rawValue.year
      );
    }

    const newDateValue = dateUtils.parseDateString(
      `${state.selectedDate.rawValue.month} ${newDisplay.currentYear}`
    );

    dispatch({ type: "SET_DISPLAY", payload: newDisplay });
    dispatch({ type: "GUESS_DATE", payload: newDateValue });
  }

  function refreshDisplay(year?: number) {
    const display = dateUtils.getDisplayValueFromYear(
      "current",
      year ? year : state.selectedDate.rawValue.year
    );

    dispatch({ type: "SET_DISPLAY", payload: display });
  }

  function moveCursor(move: ArrowKey) {
    let dateCoordinate: DateCoordinate;
    if (state.contentMode === ContentMode.MONTH) {
      dateCoordinate = dateUtils.navigateMonthByKeys(
        move,
        state.selectedDate.rawValue,
        state.coordinate
      );
    } else {
      dateCoordinate = dateUtils.navigateYearByKeys(
        move,
        state.selectedDate.rawValue,
        state.dateDisplay.currentYearRange,
        state.coordinate
      );
    }

    dispatch({
      type: "SET_COORDINATE",
      payload: dateCoordinate.newCoordinate,
    });
    dispatch({ type: "GUESS_DATE", payload: dateCoordinate.newDate });
  }

  function toggleYearMode() {
    if (state.yearMode === YearMode.MULTI) {
      dispatch({ type: "SET_HEADER", payload: YearMode.SINGLE });
      dispatch({ type: "SET_CONTENT_MODE", payload: ContentMode.MONTH });
    } else {
      dispatch({ type: "SET_HEADER", payload: YearMode.MULTI });
      dispatch({ type: "SET_CONTENT_MODE", payload: ContentMode.YEAR });
    }
  }

  function handleUpArrow() {
    if (state.activeSection !== View.CONTENT) {
      broadcastFinalValue(state.selectedDate);
    } else {
      if (state.coordinate.x === 0) {
        dispatch({ type: "SET_VIEW", payload: View.HEADER });
      }

      moveCursor(ArrowKey.U);
    }
  }

  function handleDownArrow() {
    if (!state.isExpanded) {
      dispatch({ type: "OPEN" });
      jumpIntoInput();
    }

    if (
      state.activeSection === View.INPUT ||
      state.activeSection === View.DIV
    ) {
      dispatch({ type: "SET_VIEW", payload: View.HEADER });
    }

    if (state.activeSection === View.HEADER) {
      dispatch({ type: "SET_VIEW", payload: View.CONTENT });

      // Always start with the top-left value for better user experience
      const month = state.dateDisplay.months[0];
      const year =
        state.contentMode === ContentMode.YEAR
          ? state.dateDisplay.years[0]
          : state.selectedDate.rawValue.year;

      const newDate = dateUtils.parseDateString(month + " " + year);
      dispatch({ type: "GUESS_DATE", payload: newDate });
      dispatch({ type: "SET_COORDINATE", payload: { x: 0, y: 0 } });
    }

    if (state.activeSection === View.CONTENT) {
      moveCursor(ArrowKey.D);
    }
  }

  function handleLeftArrow() {
    if (state.activeSection === View.HEADER) {
      handleHeaderNavigation("previous");
    }

    if (state.activeSection === View.CONTENT) {
      moveCursor(ArrowKey.L);
    }
  }

  function handleRightArrow() {
    if (state.activeSection === View.HEADER) {
      handleHeaderNavigation("next");
    }

    if (state.activeSection === View.CONTENT) {
      moveCursor(ArrowKey.R);
    }
  }

  function handleEnterKey() {
    const isSelectingMonth =
      state.activeSection === View.CONTENT &&
      state.contentMode === ContentMode.MONTH;

    const isSelectingYear =
      state.activeSection === View.CONTENT &&
      state.contentMode === ContentMode.YEAR;

    const isTyping =
      state.isExpanded &&
      (state.activeSection === View.INPUT || state.activeSection === View.DIV);

    if (!state.isExpanded) {
      dispatch({ type: "OPEN" });
      jumpIntoInput();
    }

    if (isSelectingYear || isTyping) {
      broadcastFinalValue(state.selectedDate);
      refreshDisplay();
    }

    if (isSelectingMonth && state.yearMode === YearMode.SINGLE) {
      broadcastFinalValue(state.selectedDate);
    }

    if (state.activeSection === View.HEADER) {
      toggleYearMode();
    }
  }

  function handleTabKey() {
    if (!state.isExpanded) {
      return;
    }

    if (
      state.activeSection === View.INPUT ||
      state.activeSection === View.DIV
    ) {
      dispatch({ type: "SET_VIEW", payload: View.HEADER });
    }

    if (state.activeSection === View.HEADER) {
      dispatch({ type: "SET_VIEW", payload: View.CONTENT });
    }

    if (state.activeSection === View.CONTENT) {
      moveCursor(ArrowKey.R);
    }
  }

  function handleSpacebar() {
    if (state.isExpanded && state.activeSection === View.CONTENT) {
      broadcastFinalValue(state.selectedDate);
    } else if (state.isExpanded && state.activeSection === View.HEADER) {
      toggleYearMode();
    } else {
      dispatch({ type: "OPEN" });
      jumpIntoInput();
    }
  }

  function handleDatePickerKeyboardNavigation(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    switch (event.key) {
      case " " || "Spacebar": // Older browsers return "Spacebar"
        handleSpacebar();
        break;
      case "Tab":
        handleTabKey();
        break;
      case "Enter":
        handleEnterKey();
        break;
      case "ArrowUp":
        handleUpArrow();
        break;
      case "ArrowDown":
        handleDownArrow();
        break;
      case "ArrowLeft":
        handleLeftArrow();
        break;
      case "ArrowRight":
        handleRightArrow();
        break;
    }
  }

  // Since arrow keys control DatePicker, we don't want them to scroll the viewport too
  function preventArrowKeyScroll(event: React.KeyboardEvent<HTMLDivElement>) {
    const events = [
      "ArrowUp",
      "ArrowDown",
      " ", // Spacebar
      "Spacebar",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (state.isExpanded && event.key === "Tab") {
      event.preventDefault();
    }

    if (
      state.activeSection === View.INPUT &&
      events.slice(0, 2).includes(event.key)
    ) {
      event.preventDefault();
    }

    if (
      state.activeSection !== View.INPUT &&
      state.activeSection !== View.DIV &&
      events.includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  return (
    <div
      onKeyDown={preventArrowKeyScroll}
      onKeyUp={handleDatePickerKeyboardNavigation}
    >
      {label && <div className="mb-2">{label}</div>}
      {state.warning && (
        <p className="text-xs text-gray-600 mb-2">{state.warning}</p>
      )}

      <div
        ref={datePickerRef}
        className={classNames(
          "relative flex items-center rounded-lg px-3 h-12 w-full bg-black cursor-pointer",
          "focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50",
          "focus-within:ring focus-within:ring-red focus-within:ring-opacity-50"
        )}
        tabIndex={tabIndex || 0}
      >
        <SearchableSelect
          ref={inputRef}
          value={state.inputValue}
          valueChanged={(v) => handleInputChange(v)}
          toggleConfig={{
            isExpanded: state.isExpanded,
            onToggle: () => handleInputToggle(),
          }}
          placeholder={value.displayValue}
          onFormEvent={() => dispatch({ type: "OPEN" })}
          iconLeft={<CalendarIcon size={20} />}
        />

        <DropdownContainer isOpen={state.isExpanded}>
          <DropdownHeader
            title={
              state.yearMode === YearMode.MULTI
                ? state.dateDisplay.currentYearRange
                : state.selectedDate.rawValue.toFormat("yyyy")
            }
            titleClicked={() => toggleYearMode()}
            goBack={() => handleHeaderNavigation("previous")}
            goNext={() => handleHeaderNavigation("next")}
            isActive={state.activeSection === View.HEADER}
          />
          {state.contentMode === "year" ? (
            <DropdownContent
              items={state.dateDisplay.years.map((i) => i.toString())}
              currentValue={state.selectedDate.rawValue.toFormat("yyyy")}
              itemClicked={(v) => handleContentSelect(v)}
            />
          ) : (
            <DropdownContent
              items={state.dateDisplay.months}
              currentValue={state.selectedDate.rawValue.toFormat("MMM")}
              itemClicked={(v) => handleContentSelect(v)}
            />
          )}
        </DropdownContainer>
      </div>
    </div>
  );
}
