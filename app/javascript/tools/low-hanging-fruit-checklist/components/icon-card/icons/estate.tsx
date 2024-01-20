import React from "react";

export default function IconCardBankIcon(): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-lg bg-teal bg-opacity-10 text-teal">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 21C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7H17V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20ZM10 13.5V14C10 14.5523 10.4477 15 11 15H13C13.5523 15 14 14.5523 14 14V13.5C14 13.2239 13.7761 13 13.5 13H10.5C10.2239 13 10 13.2239 10 13.5ZM9 7H15V5H9V7ZM4 9H20V19H4V9Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
