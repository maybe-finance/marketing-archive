import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import usePlayer from "./usePlayer";

export default function Player(): JSX.Element {
  const { episode, close } = usePlayer();

  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed max-w-2xl inset-x-0 mx-auto bottom-4 sm:bottom-12 z-10 "
        >
          <button onClick={close} className="absolute right-6 top-3">
            <i className="ri-lg ri-close-circle-line opacity-70 hover:opacity-100" />
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: episode.player }}
            style={{ background: "#30343c" }}
            className="mx-4 rounded-lg overflow-hidden"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
