import React from "react";

import Card from "../card";
import usePlayer from "../player/usePlayer";
import { Episode as EpisodeType } from "../../types";

type EpisodeProps = {
  episode: EpisodeType;
};

export default function Episode({ episode }: EpisodeProps): JSX.Element {
  const { play } = usePlayer();

  const handleClick = (): void => {
    play(episode);
  };

  return (
    <>
      <Card
        className="hidden sm:flex items-start sm:space-x-6"
        paddingClassName="p-6 sm:p-8"
        scale
      >
        <img src={episode.cover} className="w-25 rounded-2xl hidden sm:block" />
        <div className="flex flex-col sm:space-y-2">
          <a
            className="group space-x-2 align-middle cursor-pointer"
            href={`/podcast/${episode.slug}`}
          >
            <span className="text-white text-xl sm:text-2xl font-display font-black group-hover:underline">
              {episode.title}
            </span>
            <i className="ri-xl ri-lg ri-link-m text-gray-900 group-hover:text-gray-500" />
          </a>
          <div className="text-lg">{episode.summary}</div>
          <div className="flex space-x-2.5 text-gray-400 items-center">
            <span>{episode.date}</span>
            <span>|</span>
            <span>{episode.duration}</span>
            <span>|</span>
            <span>{`E${episode.number}`}</span>
          </div>
        </div>
        <div onClick={handleClick} className="hidden sm:block">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-white ri-play-fill text-black ri-2x cursor-pointer transition-all transform hover:scale-105" />
        </div>
      </Card>

      <Card
        className="sm:hidden flex flex-col"
        paddingClassName="p-6 sm:p-8"
        scale
      >
        <div className="flex space-x-2.5 text-gray-400 items-center mb-1">
          <span>{episode.date}</span>
          <span>|</span>
          <span>{`E${episode.number}`}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <a
            className="group space-x-2 align-middle cursor-pointer"
            href={`/podcast/${episode.slug}`}
          >
            <span className="text-white text-xl sm:text-2xl font-display font-black group-hover:underline">
              {episode.title}
            </span>
          </a>
          <div className="text-lg">{episode.summary}</div>
          <div className="flex space-x-3 text-gray-400 items-center">
            <div onClick={handleClick}>
              <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center bg-white ri-play-fill text-black ri-sm cursor-pointer transition-all transform hover:scale-105" />
            </div>
            <span>{episode.duration}</span>
          </div>
        </div>
      </Card>
    </>
  );
}
