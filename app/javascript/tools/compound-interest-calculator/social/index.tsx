import React from "react";

import * as config from "./config";
import Card from "./card";

export default function Social(): JSX.Element {
  return (
    <div className="flex flex-col sm:grid sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-3 gap-6">
      {config.cards.map((card, index) => (
        <Card card={card} key={index} scale />
      ))}
    </div>
  );
}
