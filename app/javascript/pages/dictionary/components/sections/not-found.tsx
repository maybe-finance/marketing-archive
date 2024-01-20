import React from "react";

type NotFoundProps = {
  query: string;
};

export default function NotFound({ query }: NotFoundProps): JSX.Element {
  return (
    <div className="my-40 max-w-100 mx-auto">
      <h2 className="font-display text-3xl font-black text-center">
        No results found
      </h2>
      <p className="text-lg text-center mt-4">
        {`We didn’t find “${query}”. Think it should be in our dictionary?
        Let us know `}
        <a href="#term-suggestion" className="font-medium underline text-teal">
          below
        </a>
        .
      </p>
    </div>
  );
}
