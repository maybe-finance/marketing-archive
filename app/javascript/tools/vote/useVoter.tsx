import { useState, useEffect } from "react";
import { Voter } from "./types";
import api from "./api";

type useVoterProps = {
  onVote: () => void;
};

export default function useVoter({ onVote }: useVoterProps): Voter {
  // Votes performed on this device
  const [votes, setVotes] = useState<number[]>([]);
  // Votes performed during this session
  const [newVotes, setNewVotes] = useState<number[]>([]);

  const vote = async (toolId: number) => {
    try {
      setNewVotes([...newVotes, toolId]);
      await api.vote(toolId);
    } catch {
      setVotes([...votes, toolId]);
      setNewVotes(newVotes.filter((id) => id !== toolId));
    }

    onVote();
  };

  const voted = (toolId: number) => {
    return votes.includes(toolId) || newVotes.includes(toolId);
  };

  const getVotes = async () => {
    const votes = await api.getVotes();

    setVotes(votes);
  };

  const hasNewVote = (toolId: number) => {
    return newVotes.includes(toolId);
  };

  useEffect(() => {
    getVotes();
  }, []);

  return {
    vote,
    voted,
    hasNewVote,
  };
}
