import React from "react";
import classNames from "classnames";

import { Player as PlayerType } from "../../types";

type PlayerProps = {
  player: PlayerType;
  variant?: "default" | "dark";
};

export default function Player({
  player,
  variant = "default",
}: PlayerProps): JSX.Element {
  const bgColor = classNames(
    variant === "default" && "bg-gray-900",
    variant === "dark" && "bg-black"
  );

  return (
    <a
      className={`flex justify-left items-center border border-gray-500 rounded-lg p-2 space-x-3 min-w-34 ${bgColor}`}
      href={player.url}
      target="_blank"
      rel="noreferrer"
    >
      <img src={player.logo} className="w-7" />
      <div className="flex flex-col">
        <div className="text-gray-100 text-xs font-medium">Listen on</div>
        <div className="text-white text-base font-medium whitespace-nowrap">
          {player.name}
        </div>
      </div>
    </a>
  );
}
