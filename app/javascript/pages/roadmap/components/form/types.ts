export enum Category {
  IMPROVEMENT = "improvement",
  INTEGRATION = "integration",
  DEALBREAKER = "dealbreaker",
  UX = "ux",
  BUG = "bug",
  MISC = "misc",
}

export type CategoryOption = {
  icon: string;
  label: string;
  value: Category;
};

export type Form = {
  email: string;
  onEmailChange: (email: string) => void;
  category?: Category;
  onCategoryChange: (category: Category) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: (resetEmail?: boolean) => void;
};

export type RoadmapIdea = {
  email: string;
  category: Category;
  description: string;
};
