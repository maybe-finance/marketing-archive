export type Item = {
  title: string;
  description: string;
  status: Status;
};

export enum Status {
  PLANNING = "planning",
  IN_PROGRESS = "in-progress",
  UPCOMING = "upcoming",
}
