import React from "react";
import { motion } from "framer-motion";

import { ToolHeader } from "../../components/tool";
import { useModal } from "../../hooks";
import Card from "./components/Card";
import WaitlistModal from "./components/WaitlistModal";
import SubscriptionModal from "./components/SubscriptionModal";
import Lines from "./components/Lines";
import useTools from "./useTools";
import useVoter from "./useVoter";
import useSubscriptionModal from "./useSubscriptionModal";
import LoadingCard from "./components/LoadingCard";

export default function VoteSection(): JSX.Element {
  const waitlistModal = useModal();
  const subscriptionModal = useSubscriptionModal({
    onSubmit: waitlistModal.openModal,
  });
  const voter = useVoter({ onVote: subscriptionModal.openModal });
  const [isLoadingTools, tools] = useTools(voter);

  return (
    <>
      <div className="px-4 overflow-hidden text-white">
        <Lines.Teal />
        <ToolHeader
          title="Vote for the next mini-tool"
          description="Have your say by casting your vote for what mini-tool we should be building next."
        />

        <div className="mx-auto space-y-4 max-w-7xl mt-18">
          {tools.map((tool) => (
            <motion.div layout key={tool.id}>
              <Card tool={tool} />
            </motion.div>
          ))}

          {isLoadingTools &&
            Array.from({ length: 5 }).map((_, i) => <LoadingCard key={i} />)}
        </div>
      </div>
      <SubscriptionModal
        isOpen={subscriptionModal.isOpen}
        onClose={subscriptionModal.closeModal}
        onSubmit={subscriptionModal.submit}
      />
      <WaitlistModal
        isOpen={waitlistModal.isOpen}
        onClose={waitlistModal.closeModal}
      />
    </>
  );
}
