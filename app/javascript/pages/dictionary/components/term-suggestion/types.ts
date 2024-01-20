export type Form = {
  email: string;
  onEmailChange: (email: string) => void;
  term: string;
  onTermChange: (term: string) => void;
  definition: string;
  onDefinitionChange: (definition: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: (resetEmail?: boolean) => void;
};

export type TermSuggestion = {
  email: string;
  term: string;
  definition?: string;
};
