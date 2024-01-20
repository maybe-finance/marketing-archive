import React from "react";

import { Card as CardType } from "./types";

interface Props {
  card: CardType;
  layout?: "default" | "big";
  scale?: boolean;
}

export default function Card({
  card,
  layout = "default",
  scale = false,
}: Props): JSX.Element {
  if (layout === "big") {
    return (
      <a
        href={card.href}
        className={`flex flex-col justify-start items-start text-white bg-gray-900 rounded-2xl p-4 xs:p-6 md:p-10 group text-left ${
          scale ? "transform-gpu transition-transform hover:scale-105" : ""
        }`}
      >
        <i
          className={`w-20 h-20 flex items-center justify-center rounded-3xl mb-6 ${card.icon}`}
        >
          {!!card.logo && (
            <img src={card.logo} alt={card.header} className="w-10 h-10" />
          )}
        </i>
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-extrabold font-display md:text-4xl flex-1">
            {card.header}
          </h3>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center justify-between w-full px-5 py-4 font-medium transition-colors bg-black rounded-md group-hover:bg-opacity-50 max-w-70">
              {card.cta}
              <i className="transition-all transform opacity-50 ri-arrow-right-line ri-lg group-hover:opacity-100 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={card.href}
      className={`flex flex-col justify-start items-start text-white bg-gray-900 rounded-2xl p-4 xs:p-6 md:p-10 group text-left ${
        scale ? "transform-gpu transition-transform hover:scale-105" : ""
      }`}
    >
      <i
        className={`w-20 h-20 flex items-center justify-center rounded-3xl mb-6 ${card.icon}`}
      >
        {!!card.logo && (
          <img src={card.logo} alt={card.header} className="w-10 h-10" />
        )}
      </i>
      <h3 className="mb-6 text-xl font-extrabold md:mb-8 font-display md:text-2xl">
        {card.header}
      </h3>
      <div className="flex items-center justify-between w-full px-5 py-4 mt-auto font-medium transition-colors bg-black rounded-md group-hover:bg-opacity-50">
        {card.cta}
        <i className="transition-all transform opacity-50 ri-arrow-right-line ri-lg group-hover:opacity-100 group-hover:translate-x-1" />
      </div>
    </a>
  );
}
