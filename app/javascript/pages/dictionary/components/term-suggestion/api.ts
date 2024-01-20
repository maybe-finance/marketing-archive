import axios from "axios";

import { TermSuggestion } from "./types";

const submitTermSuggestion = async (
  termSuggestion: TermSuggestion
): Promise<void> => {
  return axios.post("/api/term_suggestions", termSuggestion);
};

export default {
  submitTermSuggestion,
};
