import React from "react";
import { Button } from "../../../components/button";
import { Episode } from "../types";
import usePlayer from "./player/usePlayer";

type PlayLatestProps = {
  episode: Episode;
};

export default function PlayLatest({ episode }: PlayLatestProps): JSX.Element {
  const { play } = usePlayer();

  const handleClick = (): void => {
    play(episode);
  };

  return (
    <Button inline onClick={handleClick}>
      <div className="flex justify-center items-center space-x-2">
        <span>Play latest episode</span>
        <i className="ri ri-play-fill" />
      </div>
    </Button>
  );
}
