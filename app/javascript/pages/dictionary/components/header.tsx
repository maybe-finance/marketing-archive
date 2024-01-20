import React from "react";

export default function Header(): JSX.Element {
  return (
    <header className="text-center">
      <h1 className="mt-12 text-2xl font-extrabold font-display md:text-5xl leading-heading">
        Financial Dictionary
      </h1>
      <div className="block max-w-xl mx-auto mt-5 space-y-8 text-base text-gray-100 md:text-lg">
        <p>
          Here you’ll find the A-Z of every finance, crypto or money related
          term you can possibly think of.
        </p>
      </div>
    </header>
  );
}
