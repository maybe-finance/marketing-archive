import React, { useEffect, useState } from "react";

import { Term, Group } from "../../types";
import SectionItem from "./section-item";

type SectionProps = {
  group: Group;
  terms: Term[];
  query: string;
};

type SplitTermsInColumns = (terms: Term[], parts: number) => Term[][];

const splitTermsInColumns: SplitTermsInColumns = (terms, parts) => {
  const result = [];
  const newTerms = [...terms];

  for (let i = parts; i > 0; i--) {
    result.push(newTerms.splice(0, Math.ceil(newTerms.length / i)));
  }

  return result;
};

export default function Section({
  group,
  terms,
  query,
}: SectionProps): JSX.Element {
  const [parts, setParts] = useState(4);
  const columns = splitTermsInColumns(terms, parts);

  const updateParts = () => {
    const width = window.innerWidth;

    if (width < 640) return setParts(1);
    if (width < 768) return setParts(2);
    if (width < 1024) return setParts(3);

    return setParts(4);
  };

  useEffect(() => {
    updateParts();
    window.addEventListener("resize", updateParts);
  }, []);

  return (
    <div className="py-18 px-2 xl:px-0" id={group.value}>
      <div className="font-display text-3xl font-black mb-8">{group.label}</div>

      <div className="flex -mx-3 gap-4">
        {columns.map((terms, index) => (
          <div
            className="flex flex-col flex-1 gap-4"
            key={index + query + parts}
          >
            {terms.map((term) => (
              <SectionItem term={term} key={term.slug + query} query={query} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
