import React, { useEffect } from "react";

import { Input } from "../../../components/inputs";

type SearchProps = {
  query: string;
  onChange: (query: string) => void;
};

export default function Search({ query, onChange }: SearchProps): JSX.Element {
  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.metaKey && e.key === "k") {
        document.querySelector("#search-input")?.focus();
      }
    });
  }, []);

  return (
    <Input
      id="search-input"
      type="text"
      placeholder="Search for any term here"
      fixedLeft={
        <i className="ri-search-line ri-xl text-gray-400 ml-1.5 mr-0.5" />
      }
      inputWrapperClassName="bg-gray-900"
      autoComplete="off"
      value={query}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}
