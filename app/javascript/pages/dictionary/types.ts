export type Term = {
  term: string;
  slug: string;
  definition?: string;
};

export type ApiTerm = {
  term: string;
  slug: string;
  definition?: string;
};

export type Group = {
  label: string;
  value: string;
  matcher: RegExp;
};
