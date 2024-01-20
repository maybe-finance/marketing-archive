import { useEffect, useMemo, useState } from "react";

export default function useInputFormatting<T>(
  value: T | undefined,
  parseValue: (value: string) => T | null,
  formatValue: (value: T | null) => string,
  inputPattern = /^.+$/,
  onValueChange?: (value: T) => void
): {
  rawValue: string;
  parsedValue: T | null;
  setRawValue: (value: string) => void; // Set the raw value directly, such as on input change. Note: triggers `onValueChange` if the parsed value is valid (not null).
  isValidInput: (input: string) => boolean; // Whether the given string matches the inputPattern
  formatRawValue: () => void; // Update the raw value with results of `formatValue`. Doesn't trigger any event.
  updateParsedValue: (newValue: T | null) => void; // Update the parsed value (and raw value accordingly)
} {
  // Raw input value (initially the properly formatted default value)
  const [rawValue, setRawValue] = useState(formatValue(value ?? null));

  // Parsed input value calculated from rawValue
  const parsedValue = useMemo(() => parseValue(rawValue), [rawValue]);

  // Sets rawValue and calls onValueChange callback
  const onRawValueChange = (value: string) => {
    setRawValue(value);
    const parsedValue = parseValue(value);
    if (parsedValue !== null) {
      onValueChange && onValueChange(parsedValue);
    }
  };

  // Used determine if input should be accepted
  const isValidInput = (input: string): boolean =>
    input.match(inputPattern) !== null;

  const formatRawValue = () => setRawValue(formatValue(parsedValue));

  // Updates with a pre-parsed value by setting rawValue to formatted newValue
  const updateParsedValue = (newValue: T | null) => {
    onRawValueChange(formatValue(newValue));
  };

  // Update raw value whenever value prop changes
  useEffect(() => {
    if (value !== undefined && parsedValue !== value) {
      setRawValue(formatValue(value));
    }
  }, [value]);

  return {
    rawValue,
    parsedValue: parsedValue,
    setRawValue: onRawValueChange,
    isValidInput,
    formatRawValue,
    updateParsedValue,
  };
}
