import classNames from "classnames";
import React from "react";
import { ChevronIcon } from "../icons";

export interface DropdownHeaderProps {
  title: string;
  titleClicked: () => void;
  goNext: () => void;
  goBack: () => void;
  isActive: boolean;
}

export function DropdownHeader({
  title,
  titleClicked,
  goNext,
  goBack,
  isActive,
}: DropdownHeaderProps): JSX.Element {
  return (
    <div className="grid grid-cols-6 items-center border-b-2 border-gray-700 border-opacity-20 pb-2">
      <div
        onClick={goBack}
        onMouseDown={(e) => e.preventDefault()} // prevents other text from being selected when clicked
        className="justify-self-start pl-2 col-span-1"
      >
        <ChevronIcon
          className="text-white hover:opacity-80"
          size={24}
          orientation="left"
        />
      </div>
      <div
        className={classNames(
          "select-none hover:bg-gray-700 hover:bg-opacity-80 w-full text-center p-1 rounded-sm justify-self-stretch col-span-4",
          isActive ? "bg-gray-700 bg-opacity-80" : ""
        )}
        onClick={titleClicked}
      >
        {title}
      </div>
      <div
        onClick={goNext}
        onMouseDown={(e) => e.preventDefault()} // prevents other text from being selected when clicked
        className="justify-self-end pr-2 col-span-1"
      >
        <ChevronIcon
          className="text-white hover:opacity-80"
          size={24}
          orientation="right"
        />
      </div>
    </div>
  );
}
