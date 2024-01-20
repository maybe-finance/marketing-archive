import { Status } from "./types";

export const titles = {
  [Status.PLANNING]: "Planning",
  [Status.IN_PROGRESS]: "In progress",
  [Status.UPCOMING]: "Upcoming",
};

export const descriptions = {
  [Status.PLANNING]:
    "Projects and features in the design, planning and research phase that will be in development soon.",
  [Status.IN_PROGRESS]:
    "Projects and features in active development that will roll out in the very near future.",
  [Status.UPCOMING]:
    "Many of these items are very large projects that will be broken down in to much smaller chunks. These are “big picture” items.",
};

export const iconClassNames = {
  [Status.PLANNING]: "text-purple ri-flashlight-fill",
  [Status.IN_PROGRESS]: "text-teal ri-settings-5-line",
  [Status.UPCOMING]: "text-red ri-calendar-line",
};

export const iconBgClassNames = {
  [Status.PLANNING]: "bg-purple",
  [Status.IN_PROGRESS]: "bg-teal",
  [Status.UPCOMING]: "bg-red",
};

export const iconColorClassNames = {
  [Status.PLANNING]: "text-purple",
  [Status.IN_PROGRESS]: "text-teal",
  [Status.UPCOMING]: "text-red",
};

export default {
  titles,
  descriptions,
  iconClassNames,
  iconBgClassNames,
  iconColorClassNames,
};
