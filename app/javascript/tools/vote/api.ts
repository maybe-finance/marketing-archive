import { Tool, ToolIdea, RawTool } from "./types";
import axios from "axios";

const VOTES_KEY = "tools_vote__votes_v1";

const saveVotesOnDevice = (votes: number[]): void => {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
};

const getVotesFromDevice = (): number[] => {
  const votes = localStorage.getItem(VOTES_KEY);

  return JSON.parse(votes || "[]").map((vote: string) => parseInt(vote, 10));
};

const getVotes = async (): Promise<number[]> => {
  return Promise.resolve(getVotesFromDevice());
};

const vote = async (toolId: number): Promise<void> => {
  const votes = getVotesFromDevice();
  saveVotesOnDevice([...votes, toolId]);

  return axios.post("/api/votes", { tool_id: toolId });
};

const transformRawTool = (rawTool: RawTool): Tool => ({
  ...rawTool,
  subTopic: rawTool.sub_topic,
  votes: rawTool.votes_count || 0,
});

const getTools = async (): Promise<Tool[]> => {
  const tools: RawTool[] = await axios
    .get("/api/tools")
    .then(({ data }) => data);

  return tools.map(transformRawTool);
};

const subscribeToWaitlist = async (email: string): Promise<void> => {
  return axios.post("/api/waitlist", { email });
};

const submitToolIdea = async (toolIdea: ToolIdea): Promise<void> => {
  return axios.post("/api/tools", toolIdea);
};

export default {
  getTools,
  getVotes,
  vote,
  subscribeToWaitlist,
  submitToolIdea,
};
