import React from "react";

import Section from "./section";
import NotFound from "./not-found";
import { GROUPS } from "../../config";
import Fuzzy from "../../utils/fuzzy";
import type { Term, Group } from "../../types";

type SectionsProps = {
  terms: Term[];
  query: string;
};

type SplitTerms = (
  terms: Term[],
  groups: Group[]
) => {
  group: Group;
  terms: Term[];
}[];

const splitTerms: SplitTerms = (terms, groups) =>
  groups.map((group) => ({
    group,
    terms: terms.filter((term) => group.matcher.test(term.term)),
  }));

export default function Sections({ terms, query }: SectionsProps): JSX.Element {
  const filteredTerms = terms.filter((term) => Fuzzy.match(term.term, query));

  const groupedTerms = splitTerms(filteredTerms, GROUPS);

  const filteredGroupedTerms = groupedTerms.filter(
    (group) => group.terms.length > 0
  );

  if (filteredTerms.length === 0) {
    return <NotFound query={query} />;
  }

  return (
    <div className="divide-y divide-gray-800">
      {filteredGroupedTerms.map(({ group, terms }) => (
        <Section
          group={group}
          terms={terms}
          query={query}
          key={group.value + query}
        />
      ))}
    </div>
  );
}
