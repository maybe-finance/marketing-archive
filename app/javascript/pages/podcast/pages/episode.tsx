import React from "react";

import Episode from "../components/episode";
import Players from "../components/players";
import RSS from "../components/rss";
import Player from "../components/player";
import SocialCard from "../components/social/card";
import Sparkline from "../components/sparkline";
import Card from "../components/card";
import { cards } from "../components/social/config";
import { Episode as EpisodeType } from "../types";

type EpisodePageProps = {
  episode: EpisodeType;
};

export default function EpisodePage({
  episode,
}: EpisodePageProps): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 mb-18">
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-12 lg:grid-flow-row lg:gap-6 hidden relative z-10">
        <div className="row-span-2 col-span-7 h-full">
          <Episode episode={episode} />
        </div>
        <div className="col-span-5">
          <SocialCard card={cards[0]} scale />
        </div>
        <Card className="space-y-6 col-span-5">
          <Players variant="left" />
          <RSS variant="left" iconOnly />
        </Card>
        <div className="col-span-12 grid grid-cols-3 grid-rows-1 gap-6">
          <SocialCard card={cards[1]} scale />
          <SocialCard card={cards[2]} scale />
          <SocialCard card={cards[3]} scale />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:hidden relative z-10">
        <Episode episode={episode} />
        <Card className="space-y-6">
          <Players variant="left" />
          <RSS variant="left" />
        </Card>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6 space-y-4 sm:space-y-0">
          <SocialCard card={cards[0]} scale />
          <SocialCard card={cards[1]} scale />
          <SocialCard card={cards[2]} scale />
          <SocialCard card={cards[3]} scale />
        </div>
      </div>

      <Sparkline
        className="text-purple right-0 top-1/4"
        direction="rtl"
        variant={2}
      />

      <Sparkline
        className="text-yellow left-0 bottom-0"
        direction="ltr"
        variant={3}
      />

      <Player />
    </div>
  );
}
