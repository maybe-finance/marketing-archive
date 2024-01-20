import React, { Fragment, ReactElement } from "react";
import classNames from "classnames";
import { ChevronIcon } from "../icons";
import { Listbox } from "@headlessui/react";

export interface SelectableOption {
  value: string;
  label?: string; // Use if you want the option to display a different string than the actual value
  icon?: React.ReactElement;
  details?: React.ReactNode;
}

export interface SelectProps {
  options: SelectableOption[];
  selectedOption: SelectableOption | null;
  onChange: (option: SelectableOption) => void;
  label?: string;
  truncateLabel?: boolean; // Whether to truncate the label instead of wrapping when it doesn't fit on a single line
  icon?: React.ReactElement; // An icon that shows on the left side of the button, overriding the selected option's icon, if any
  optionClassName?: string;
  optionsClassName?: string;
  buttonClassName?: string;
  withButtonRing?: boolean;
}

const renderIcon = (element: React.ReactElement) => {
  if (Object.prototype.hasOwnProperty.call(element.props, "size") === false) {
    return React.cloneElement(element, { size: 16 });
  }
  return element;
};

export function Select({
  options = [],
  selectedOption,
  onChange,
  label,
  truncateLabel = true,
  icon,
  optionClassName,
  optionsClassName,
  buttonClassName,
  withButtonRing = true,
}: SelectProps): JSX.Element {
  const buttonRingClassName = (open: boolean) => {
    if (!withButtonRing) return "";

    return classNames(
      "focus:outline-none focus-visible:ring focus-visible:ring-red focus-visible:ring-opacity-50",
      open && "ring ring-red ring-opacity-50"
    );
  };

  return (
    <Listbox value={selectedOption} onChange={onChange}>
      {({ open }) => (
        <div className="relative select-none">
          {label && (
            <Listbox.Label
              className={classNames(
                "mb-2 block",
                truncateLabel ? "truncate" : ""
              )}
            >
              {label}
            </Listbox.Label>
          )}
          <Listbox.Button
            className={classNames(
              buttonClassName,
              "flex items-center w-full h-12 px-3 rounded-lg bg-black text-left",
              buttonRingClassName(open)
            )}
          >
            {(icon || selectedOption?.icon) && (
              <span
                className="mr-2.5 flex justify-center items-center w-4 h-4 flex-none"
                aria-hidden="true"
              >
                {renderIcon((icon || selectedOption?.icon) as ReactElement)}
              </span>
            )}
            <span className="flex-grow truncate">
              {selectedOption
                ? selectedOption.label || selectedOption.value
                : "Select one"}
            </span>
            <span className="ml-1 flex-none" aria-hidden="true">
              {open ? (
                <ChevronIcon size={20} orientation="up" />
              ) : (
                <ChevronIcon size={20} orientation="down" />
              )}
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={classNames(
              "z-40 absolute inset-x-0 -mx-px top-full mt-2 max-h-66 overflow-auto bg-black rounded-lg border border-gray-500 border-opacity-50 shadow-2xl focus:outline-none",
              "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
              optionsClassName
            )}
          >
            {options.map((option, index) => (
              <Listbox.Option as={Fragment} key={index} value={option}>
                {({ active, selected }) => (
                  <li
                    className={classNames(
                      "flex items-center h-10 px-3 focus:outline-none cursor-pointer",
                      !selected && active ? "bg-gray-900" : "",
                      selected && !active ? "bg-gray-800" : "",
                      selected && active ? "bg-gray-700" : "",
                      optionClassName
                    )}
                  >
                    {option.icon && (
                      <span
                        className="mr-2.5 flex justify-center items-center w-4 h-4 flex-none"
                        aria-hidden="true"
                      >
                        {renderIcon(option.icon)}
                      </span>
                    )}
                    <span className="flex-grow truncate">
                      {option.label || option.value}
                    </span>

                    {!!option.details && option.details}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}
