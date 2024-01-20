import React from "react";

import * as config from "./config";
import Card from "./card";

export default function Social(): JSX.Element {
  const { cards } = config;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 mx-auto sm:grid-cols-2 lg:grid-cols-3 xs:gap-6 max-w-7xl sm:px-8 mt-24">
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
}
