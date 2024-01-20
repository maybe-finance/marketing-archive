import React from "react";

import { Card as CardType } from "./types";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props): JSX.Element {
  return (
    <a
      href={card.href}
      className="flex flex-col justify-start items-start text-white bg-gray-900 rounded-2xl p-4 xs:p-6 md:p-10 group transform-gpu transition-transform text-left hover:scale-105"
    >
      <i
        className={`w-20 h-20 flex items-center justify-center rounded-3xl mb-6 ${card.icon}`}
      >
        {!!card.logo && (
          <img src={card.logo} alt={card.header} className="w-10 h-10" />
        )}
      </i>
      <h3 className="mb-6 text-xl font-extrabold md:mb-8 font-display md:text-2xl" >
        {card.header}
      </h3>
      <div className="flex items-center justify-between w-full px-5 py-4 mt-auto font-medium transition-colors bg-black rounded-md group-hover:bg-opacity-50">
        {card.cta}
        <i className="transition-all transform opacity-50 ri-arrow-right-line ri-lg group-hover:opacity-100 group-hover:translate-x-1" />
      </div>
    </a>
  );
}
