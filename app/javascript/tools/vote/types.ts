type Voteable = {
  voted: boolean;
  vote: () => Promise<void>;
};

// Backend response
export type RawTool = {
  id: number;
  name: string;
  description: string;
  topic: string;
  sub_topic: string;
  votes_count: number;
};

export type Tool = {
  id: number;
  name: string;
  description: string;
  topic: string;
  subTopic: string;
  votes: number;
};

export type VoteableTool = Tool & Voteable;

export type Voter = {
  vote: (toolId: number) => Promise<void>;
  voted: (toolId: number) => boolean;
  hasNewVote: (toolId: number) => boolean;
};

export type ToolIdea = {
  email: string;
  name: string;
  description: string;
};
