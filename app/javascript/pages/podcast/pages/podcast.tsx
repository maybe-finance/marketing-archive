import React from "react";

import Episodes from "../components/episodes";
import Header from "../components/header";
import Hosts from "../components/hosts";
import Sparkline from "../components/sparkline";
import PlayLatest from "../components/play-latest";
import Player from "../components/player";
import Players from "../components/players";
import RSS from "../components/rss";
import Social from "../components/social";
import { Episode } from "../types";

type PodcastPageProps = {
  episodes: Episode[];
};

export default function PodcastPage({
  episodes,
}: PodcastPageProps): JSX.Element {
  return (
    <div className="relative">
      <div className="relative">
        <div className="max-w-7xl mx-auto pt-2 px-4 relative z-10">
          <Header />
        </div>
        <Sparkline
          className="text-red right-0 bottom-0"
          variant={0}
          direction="rtl"
        />
      </div>
      <div className="flex justify-center items-center mt-8">
        <PlayLatest episode={episodes[0]} />
      </div>
      <div className="mt-12 px-4">
        <Players />
      </div>
      <div className="flex flex-col justify-center items-center mt-12">
        <RSS />
      </div>

      <div className="relative">
        <Sparkline
          className="text-purple left-0 top-1/4"
          variant={1}
          direction="ltr"
        />
        <Sparkline
          className="text-teal right-0 bottom-0"
          variant={2}
          direction="rtl"
        />
        <div className="max-w-3xl mx-auto mt-24 px-4 relative z-10">
          <Episodes episodes={episodes} />
        </div>
      </div>
      <div className="relative">
        <div className="max-w-3xl mx-auto mt-24 px-4 relative z-10">
          <Hosts />
        </div>
      </div>
      <div className="relative">
        <div className="max-w-6xl mx-auto mt-24 px-4 relative z-10 mb-20">
          <Social />
        </div>

        <Sparkline
          className="text-yellow left-0 bottom-0"
          variant={3}
          direction="ltr"
        />
      </div>
      <Player />
    </div>
  );
}
