import React from "react";

import { Episode as EpisodeType } from "../types";
import usePlayer from "./player/usePlayer";

type EpisodeProps = {
  episode: EpisodeType;
};

export default function Episode({ episode }: EpisodeProps): JSX.Element {
  const { play } = usePlayer();

  const handleClick = (): void => {
    play(episode);
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 md:p-10 h-full">
      <div className="flex space-x-2 text-gray-400">
        <a href="/podcast" className="hover:underline">
          All episodes
        </a>
        <i className="ri-arrow-right-s-line" />
        <span>Episode {episode.number}</span>
      </div>

      <div className="flex justify-between items-start mt-4 sm:mt-8 space-x-2">
        <div className="flex flex-col space-y-2">
          <div className="text-white text-xl sm:text-3xl font-display font-black group-hover:underline">
            {episode.title}
          </div>
          <div className="flex space-x-2.5 text-gray-400">
            <span>{episode.date}</span>
            <span>|</span>
            <span>{episode.duration}</span>
          </div>
        </div>
        <div onClick={handleClick}>
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center bg-white ri-play-fill text-black ri-2x cursor-pointer transition-all transform hover:scale-105" />
        </div>
      </div>

      <div className="mt-8" id="podcast-episode-description">
        {episode.summary}
        <br />
        <br />
        <b>Show Notes</b>
        <br />
        <div dangerouslySetInnerHTML={{ __html: episode.description }} />
      </div>
    </div>
  );
}
