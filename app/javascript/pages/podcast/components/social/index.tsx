import React from "react";

import * as config from "./config";
import Card from "./card";

export default function Social(): JSX.Element {
  return (
    <div>
      <div className="hidden md:flex md:flex-col gap-6">
        <Card card={config.cards[0]} layout="big" scale />
        <div className="grid grid-rows-1 grid-cols-3 gap-6">
          {config.cards.slice(1).map((card, index) => (
            <Card card={card} key={index} scale />
          ))}
        </div>
      </div>

      <div className="hidden md:hidden sm:grid sm:grid-rows-2 sm:grid-cols-2 gap-6">
        {config.cards.map((card, index) => (
          <Card card={card} key={index} scale />
        ))}
      </div>

      <div className="flex flex-col gap-6 sm:hidden">
        {config.cards.map((card, index) => (
          <Card card={card} key={index} scale />
        ))}
      </div>
    </div>
  );
}
