import React from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import { Button, ButtonVariant } from "../../../../components/button";

import { Episode as EpisodeType } from "../../types";
import Episode from "./episode";
import usePagination from "./usePagination";
// import config from "./config";

type EpisodesProps = {
  episodes: EpisodeType[];
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Episodes({ episodes }: EpisodesProps): JSX.Element {
  const {
    paginatedContent: paginatedEpisodes,
    hasMore,
    showMore,
  } = usePagination(episodes);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-red bg-opacity-10 ri-play-fill text-red ri-2x" />
      <h2 className="font-display mt-10 font-extrabold text-2xl md:text-4xl leading-heading">
        Episodes
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center space-y-6 mt-16"
      >
        {paginatedEpisodes.map((episode) => (
          <motion.div key={episode.id} variants={item}>
            <Episode episode={episode} />
          </motion.div>
        ))}
      </motion.div>
      {hasMore && (
        <div className="mt-10">
          <Button
            variant={ButtonVariant.Gray}
            className="font-semibold text-white flex space-x-2 items-center"
            onClick={showMore}
          >
            <span>Show more episodes</span>
            <i className="ri-arrow-down-line" />
          </Button>
        </div>
      )}
    </div>
  );
}
