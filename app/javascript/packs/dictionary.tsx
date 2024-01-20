import React from "react";
import ReactDOM from "react-dom";

import { Dictionary } from "../pages/dictionary";
import { ErrorBoundary } from "../components/ErrorBoundary";
import type { Term as TermType, ApiTerm } from "../pages/dictionary/types";

import "../packs/tailwind.css";

const apiTermToTerm = (apiTerm: ApiTerm): TermType => ({
  term: apiTerm.term,
  slug: apiTerm.slug,
  definition: apiTerm.definition,
});

const dictionaryApp = document.getElementById("dictionary-app");

if (dictionaryApp) {
  const dataTerms = JSON.parse(dictionaryApp.dataset.terms || "[]");
  const terms: TermType[] = dataTerms.map(apiTermToTerm);

  document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <ErrorBoundary>
        <Dictionary terms={terms} />
      </ErrorBoundary>,
      dictionaryApp
    );
  });
}
