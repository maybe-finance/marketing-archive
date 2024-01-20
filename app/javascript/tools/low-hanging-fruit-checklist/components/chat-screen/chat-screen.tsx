import React, { ReactNode } from "react";

import { motion } from "framer-motion";

type ChatScreenProps = {
  children?: ReactNode;
};

export default function ChatScreen({ children }: ChatScreenProps): JSX.Element {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.section
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children) ? (
        children.map((child, i) => {
          return (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          );
        })
      ) : (
        <motion.div>{children}</motion.div>
      )}
    </motion.section>
  );
}
