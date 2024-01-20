import axios from "axios";

import { RoadmapIdea } from "./types";

const submitRoadmapIdea = async (roadmapIdea: RoadmapIdea): Promise<void> => {
  return axios.post("/api/roadmap_ideas", roadmapIdea);
};

export default {
  submitRoadmapIdea,
};
