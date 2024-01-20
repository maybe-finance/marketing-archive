import React, { useState } from "react";

import FormInputWrapper from "../form-input-wrapper/form-input-wrapper";

type FormInputMoneyProps = {
  id: string;
  value?: number;
  onChange?: (value: number) => void;
};

export default function FormInputMoney(
  props: FormInputMoneyProps
): JSX.Element {
  const [value, setValue] = useState<number | "">(
    typeof props.value === "number" ? props.value : ""
  );

  const onInputChange = (newValue: string): void => {
    if (newValue === "") {
      validateAndSetValue(newValue);
      return;
    }

    const parsed = parseInt(newValue, 10);

    if (parsed && Number.isNaN(parsed)) {
      return;
    }

    validateAndSetValue(parsed);
  };

  const validateAndSetValue = (newValue: number | "") => {
    // The workaround here with both `newValue` and `numberValue`
    // is to allow `undefined` here in the internal state,
    // but communicate that as a `0` to external state.
    // If we'd sync that, either we'd have to "reset" an empty input to `0` as a value
    // which I don't like as UX, or we'd have to allow `undefined` to go to the
    // external state, which makes all types have to account for `undefined` too
    // which is annoying too. The drawback is that the outside wrapper isn't
    // able to differ between `undefined` and `0` as user inputs.
    // I've decided that's OK for now, and to not waste any more time on it.
    const numberValue = newValue || 0;

    setValue(newValue);

    if (typeof props.onChange === "function") {
      props.onChange(numberValue);
    }
  };

  return (
    <FormInputWrapper>
      <span className="block pl-3 pr-2 text-gray-100">$</span>
      <input
        id={props.id}
        type="text"
        inputMode="numeric"
        className="w-full h-10 pr-3 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </FormInputWrapper>
  );
}
