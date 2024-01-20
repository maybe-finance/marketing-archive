import classNames from "classnames";
import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
} from "react";
import { ChevronIcon } from "../icons";

type SearchableSelectHandle = {
  focus: () => void;
};

export interface SearchableSelectProps {
  value: string;
  valueChanged: (value: string) => void;
  toggleConfig?: {
    isExpanded: boolean;
    onToggle: () => void;
  };
  placeholder?: string;
  iconLeft?: JSX.Element;
  onFormEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyboardEvent?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const SearchableSelect: ForwardRefRenderFunction<
  SearchableSelectHandle,
  SearchableSelectProps
> = (
  {
    value,
    valueChanged,
    toggleConfig,
    placeholder = "Type something",
    iconLeft,
    onFormEvent,
    onKeyboardEvent,
  }: SearchableSelectProps,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        if (inputRef && inputRef.current) {
          return inputRef.current.focus();
        }
      },
    };
  });

  return (
    <>
      <div className="pl-1">{iconLeft}</div>
      <div
        className={classNames(
          iconLeft ? "-ml-1" : "",
          "flex-grow flex items-center"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => valueChanged(event.target.value)}
          onFocus={(event) => onFormEvent && onFormEvent(event)}
          onKeyUp={(event) => onKeyboardEvent && onKeyboardEvent(event)}
          className="bg-transparent border-none focus:ring-0 w-full"
          tabIndex={-1} // Disable automatic tab behavior as this is manually focused via forwardRef
        />
      </div>

      {/* Toggling is not required, so only show the Chevron icon if there is a config */}
      {toggleConfig && (
        <div
          onClick={() => toggleConfig.onToggle()}
          className="justify-self-end hover:opacity-80 cursor-pointer"
        >
          {toggleConfig.isExpanded ? (
            <ChevronIcon size={20} orientation="up" />
          ) : (
            <ChevronIcon size={20} orientation="down" />
          )}
        </div>
      )}
    </>
  );
};
export default React.forwardRef(SearchableSelect);
