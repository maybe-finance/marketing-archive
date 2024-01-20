import React from "react";

import Item from "./item";
import type { Status, Item as ItemType } from "./types";
import config from "./config";

interface ColumnProps {
  status: Status;
  items: ItemType[];
}

const Column = ({ status, items }: ColumnProps): JSX.Element => {
  const title = config.titles[status];
  const description = config.descriptions[status];
  const iconClassName = config.iconClassNames[status];
  const iconBgClassName = config.iconBgClassNames[status];

  return (
    <div className="flex flex-col w-full bg-gray-900 lg:bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl">
      <div
        className={`bg-opacity-10 mx-auto rounded-2xl mt-6 w-12 h-12 flex items-center justify-center ${iconBgClassName}`}
      >
        <i className={`ri-2x ${iconClassName}`} />
      </div>
      <h2 className="font-display font-extrabold leading-heading mt-6 text-2xl text-center">
        {title}
      </h2>
      <p className="mt-2 text-gray-100 text-sm text-center lg:min-h-17">
        {description}
      </p>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Column;
