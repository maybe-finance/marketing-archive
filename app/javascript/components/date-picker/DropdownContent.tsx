import classNames from "classnames";
import React from "react";

export interface DropdownContentProps {
  items: string[];
  currentValue: string;
  itemClicked: (itemValue: string) => void;
}

export function DropdownContent({
  items,
  currentValue,
  itemClicked,
}: DropdownContentProps): JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-2 pt-4 pb-2">
      {items.map((item: string, index: number) => {
        return (
          <div
            key={index}
            onClick={() => itemClicked(item)}
            className={classNames(
              currentValue === item ? "bg-gray-700 bg-opacity-80" : "",
              "p-2 rounded-md hover:bg-gray-700 hover:bg-opacity-80 select-none justify-self-stretch text-center"
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
