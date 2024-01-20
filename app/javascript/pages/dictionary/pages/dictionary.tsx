import React, { useState } from "react";

import Header from "../components/header";
import Search from "../components/search";
import Summary from "../components/summary";
import Sections from "../components/sections";
import Social from "../components/social";
import TermSuggestion from "../components/term-suggestion";
import Sparkline from "../components/sparkline";

import type { Term } from "../types";

type DictionaryPageProps = {
  terms: Term[];
};

export default function DictionaryPage({
  terms,
}: DictionaryPageProps): JSX.Element {
  const [query, setQuery] = useState("");

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto pt-2 px-4 relative z-10">
          <Header />
        </div>
        <Sparkline
          className="text-purple left-0 top-0"
          variant={1}
          direction="ltr"
        />
      </div>

      <div className="max-w-xl m-auto mt-9 px-4">
        <Search query={query} onChange={setQuery} />
      </div>

      <div>
        <Summary />

        <div className="max-w-7xl m-auto mt-9 px-4">
          <Sections terms={terms} query={query} />
        </div>
      </div>

      <div className="relative  overflow-hidden">
        <Sparkline
          className="text-yellow left-0 top-0"
          variant={3}
          direction="ltr"
        />
        <div className="max-w-7xl m-auto my-9 mb-18 px-4">
          <TermSuggestion />
        </div>
        <Sparkline
          className="text-teal right-0 bottom-0"
          variant={0}
          direction="rtl"
        />
      </div>

      <div className="max-w-7xl m-auto my-9 mb-18 px-4">
        <Social />
      </div>
    </div>
  );
}
