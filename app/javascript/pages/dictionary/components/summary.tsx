import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Group } from "../types";
import { GROUPS } from "../config";

export default function Summary(): JSX.Element {
  const [selected, setSelected] = useState("others");
  const [bgClassName, setBgClassName] = useState("bg-black");
  const isSelected = (group: Group) => group.value === selected;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const { y } = document
        ?.querySelector("#summary")
        ?.getBoundingClientRect() || { y: 0 };

      if (y < 24) {
        setBgClassName("bg-gray-900");
      } else {
        setBgClassName("bg-black");
      }
    });
  }, []);

  return (
    <div
      className={`max-w-7xl m-auto mt-9 sticky top-4 p-2 overflow-x-auto rounded-xl transition ${bgClassName} flex justify-between z-20`}
      id="summary"
    >
      {GROUPS.map((group) => (
        <a
          key={group.value}
          className={classNames(
            "p-2 text-lg text-gray-100 rounded-lg min-w-20 text-center",
            isSelected(group)
              ? "bg-teal bg-opacity-10 text-teal hover:bg-opacity-20"
              : "hover:bg-gray-900"
          )}
          onClick={() => setSelected(group.value)}
          href={`#${group.value}`}
        >
          {group.label}
        </a>
      ))}
    </div>
  );
}
