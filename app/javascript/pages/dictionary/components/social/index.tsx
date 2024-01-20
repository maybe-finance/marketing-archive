import React from "react";

import * as config from "./config";
import Card from "./card";

export default function Social(): JSX.Element {
  return (
    <div className="flex flex-col sm:grid sm:grid-rows-1 sm:grid-cols-3 md:grid-rows-2 md:grid-cols-2 gap-6">
      {config.cards.map((card, index) => (
        <Card card={card} key={index} scale />
      ))}
    </div>
  );
}
