const maritalStatuses = {
  single: "Single",
  married: "Married",
  widowed: "Widowed",
  divorced: "Divorced",
} as const;

export type MaritalStatus = keyof typeof maritalStatuses;

export default maritalStatuses;
