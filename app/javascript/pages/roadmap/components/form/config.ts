import { CategoryOption, Category } from "./types";

export const categories: CategoryOption[] = [
  {
    icon: "⬆️",
    label: "Improvement",
    value: Category.IMPROVEMENT,
  },
  {
    icon: "🔌",
    label: "Integration",
    value: Category.INTEGRATION,
  },
  {
    icon: "💔",
    label: "Dealbreaker",
    value: Category.DEALBREAKER,
  },
  {
    icon: "✨",
    label: "UX",
    value: Category.UX,
  },
  {
    icon: "🐛",
    label: "Bug",
    value: Category.BUG,
  },
  {
    icon: "🦄",
    label: "Misc",
    value: Category.MISC,
  },
];
