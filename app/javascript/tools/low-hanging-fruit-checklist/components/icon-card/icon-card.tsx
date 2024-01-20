import React, { useState } from "react";

import IconCardCreditIcon from "./icons/credit";
import IconCardDebitIcon from "./icons/debt";
import IconCardEducationIcon from "./icons/education";
import IconCardEstateIcon from "./icons/estate";
import IconCardInsuranceIcon from "./icons/insurance";
import IconCardMedicalIcon from "./icons/medical";
import IconCardRetirementIcon from "./icons/retirement";
import IconCardSavingsIcon from "./icons/savings";
import IconCardScoialSecurityIcon from "./icons/social-security";

export type IconName =
  | "credit"
  | "debt"
  | "education"
  | "estate"
  | "insurance"
  | "medical"
  | "retirement"
  | "savings"
  | "social-security";

type IconCardProps = {
  icon: IconName;
  title: string;
  description: string | JSX.Element;
};

export default function IconCard(props: IconCardProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target && !(e.target as Element).matches("a")) {
      e.preventDefault();
      e.stopPropagation();
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="p-6 text-white bg-gray-900 text-opacity-80 rounded-3xl space-y-4"
      onClick={(e) => handleCardClick(e)}
    >
      <div className="relative sm:flex sm:items-center sm:justify-start sm:space-x-5">
        <div className="self-start flex-shrink-0 w-9 h-9">
          {props.icon === "credit" && <IconCardCreditIcon />}
          {props.icon === "debt" && <IconCardDebitIcon />}
          {props.icon === "education" && <IconCardEducationIcon />}
          {props.icon === "estate" && <IconCardEstateIcon />}
          {props.icon === "insurance" && <IconCardInsuranceIcon />}
          {props.icon === "medical" && <IconCardMedicalIcon />}
          {props.icon === "retirement" && <IconCardRetirementIcon />}
          {props.icon === "savings" && <IconCardSavingsIcon />}
          {props.icon === "social-security" && <IconCardScoialSecurityIcon />}
        </div>

        <h2 className="flex-1 mt-4 font-sans font-semibold leading-tight text-white sm:mt-0">
          {props.title}
        </h2>

        <button
          aria-label="Toggle"
          className={`absolute right-0.5 top-0.5 sm:static w-8 h-8 ml-auto flex-shrink-0 flex-grow-0 flex justify-center items-center text-gray-100 transition-all transform hover:text-white focus:text-white outline-none focus:outline-none ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
          onClick={(e) => handleButtonClick(e)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6 13.15C10.4829 13.2672 10.324 13.3332 10.1583 13.3333H9.84162C9.67628 13.3314 9.51806 13.2657 9.39996 13.15L5.12496 8.86664C5.04608 8.78841 5.00171 8.68191 5.00171 8.57081C5.00171 8.45971 5.04608 8.35321 5.12496 8.27497L5.71662 7.68331C5.79343 7.60492 5.89855 7.56075 6.00829 7.56075C6.11803 7.56075 6.22316 7.60492 6.29996 7.68331L9.99996 11.3916L13.7 7.68331C13.7782 7.60443 13.8847 7.56006 13.9958 7.56006C14.1069 7.56006 14.2134 7.60443 14.2916 7.68331L14.875 8.27497C14.9538 8.35321 14.9982 8.45971 14.9982 8.57081C14.9982 8.68191 14.9538 8.78841 14.875 8.86664L10.6 13.15Z"
              className="fill-current"
            />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div className="text-sm leading-relaxed tracking-wide space-y-2 sm:col-start-2 sm:col-span-1 row-start-2 sm:pl-14">
          {typeof props.description === "string" ? (
            <p>{props.description}</p>
          ) : (
            props.description
          )}
        </div>
      )}
    </div>
  );
}
