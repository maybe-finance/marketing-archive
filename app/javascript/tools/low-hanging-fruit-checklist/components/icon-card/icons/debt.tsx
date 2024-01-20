import React from "react";

export default function IconCardBankIcon(): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-lg bg-purple bg-opacity-10 text--current">
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
          d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4ZM20 9V6H4V9H20ZM4 18V12H20V18H4ZM6.5 14H9.5C9.77614 14 10 14.2239 10 14.5V15.5C10 15.7761 9.77614 16 9.5 16H6.5C6.22386 16 6 15.7761 6 15.5V14.5C6 14.2239 6.22386 14 6.5 14Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
