import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

import { Episode } from "../../types";

const init = {
  episode: null,
  play: () => null,
  close: () => null,
};

type UsePlayer = () => {
  episode: Episode | null;
  play: (episode: Episode) => void;
  close: () => void;
};

const usePlayer: UsePlayer = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);

  return {
    episode,
    play: setEpisode,
    close: () => setEpisode(null),
  };
};

export default singletonHook(init, usePlayer);
