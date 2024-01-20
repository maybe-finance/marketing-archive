import { Period } from "../types";

export const periodToDays = (period: Period): number => {
  return {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365,
    "all-time": Infinity,
  }[period];
};
