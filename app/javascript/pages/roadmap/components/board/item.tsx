import React, { useState } from "react";

import type { Item as ItemType } from "./types";
import config from "./config";

interface ItemProps {
  item: ItemType;
}

const Item = ({ item }: ItemProps): JSX.Element => {
  const iconClassName = config.iconColorClassNames[item.status];
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-black border-gray-500 border p-4 rounded-2xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="display flex space-x-3 items-center">
        <i className={`ri-file-list-2-line ri-xl ${iconClassName}`} />
        <h3 className="text-white text-base font-semibold">{item.title}</h3>
      </div>
      {isOpen && item.description && (
        <p className="mt-2 text-gray-100 text-base">{item.description}</p>
      )}
    </div>
  );
};

export default Item;
