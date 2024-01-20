import React from "react";
import classNames from "classnames";

import Player from "./player";
import config from "./config";
import { Player as PlayerType } from "../../types";

type PlayersProps = {
  players?: PlayerType[];
  variant?: "default" | "left";
};

export default function Players({
  players = config.players,
  variant = "default",
}: PlayersProps): JSX.Element {
  const containerClassName = classNames(
    variant === "default" && "flex flex-col justify-center items-center",
    variant === "left" && "flex flex-col justify-start items-start"
  );

  const playersClassName = classNames(
    variant === "default" && "flex gap-3 flex-wrap justify-center",
    variant === "left" && "flex gap-3 flex-wrap justify-start"
  );

  const playerVariant = variant === "default" ? "default" : "dark";

  return (
    <div className={containerClassName}>
      <p className="text-gray-500 text-base mb-4">
        Listen on any of the podcast app of your choice
      </p>
      <div className={playersClassName}>
        {players.map((player) => (
          <Player player={player} key={player.name} variant={playerVariant} />
        ))}
      </div>
    </div>
  );
}
