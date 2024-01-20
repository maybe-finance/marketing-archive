import { useState, useEffect } from "react";
import { Tool, VoteableTool, Voter } from "./types";
import api from "./api";

type VoteableToolFactory = (voter: Voter) => (tool: Tool) => VoteableTool;

type ToolsSorter = (tool1: VoteableTool, tool2: VoteableTool) => number;

const VoteableToolFactory: VoteableToolFactory = (voter) => (tool) => ({
  ...tool,
  votes: tool.votes + (voter.hasNewVote(tool.id) ? 1 : 0),
  voted: voter.voted(tool.id),
  vote: () => {
    if (voter.voted(tool.id)) return Promise.resolve();

    return voter.vote(tool.id);
  },
});

const toolsSorter: ToolsSorter = (tool1, tool2) => tool2.votes - tool1.votes;

export default function useTools(voter: Voter): [boolean, VoteableTool[]] {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchTools = async () => {
    const tools = await api.getTools();
    setTools(tools);
    setIsloading(false);
  };

  useEffect(() => {
    setIsloading(true);
    fetchTools();
  }, []);

  const voteableToolsFactory = VoteableToolFactory(voter);

  return [isLoading, tools.map(voteableToolsFactory).sort(toolsSorter)];
}
