import React from "react";

import { Term } from "../../types";
import Fuzzy from "../../utils/fuzzy";

type SectionItemProps = {
  term: Term;
  query: string;
};

export default function SectionItem({
  term,
  query,
}: SectionItemProps): JSX.Element {
  return (
    <a
      href={`/dictionary/${term.slug}`}
      className="text-left text-xl font-normal hover:bg-gray-900 py-2 px-3 rounded-lg"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: Fuzzy.highlight(term.term, query),
        }}
      />
    </a>
  );
}
