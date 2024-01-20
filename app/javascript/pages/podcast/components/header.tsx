import React from "react";

export default function Header(): JSX.Element {
  return (
    <header className="text-center">
      <img
        src="/img/podcast/podcast-cover.png"
        className="w-full pt-10 mx-auto max-w-50"
      />
      <h1 className="mt-12 text-2xl font-extrabold font-display md:text-5xl leading-heading">
        Ask Maybe
      </h1>
      <div className="block max-w-xl mx-auto mt-5 space-y-8 text-base text-gray-100 md:text-lg">
        <p>
          Ask Maybe answers your money questions by with our in-house financial
          advisor and co-founder along with Maybe's own community manager. It
          pairs perfectly with your commute, workout, or morning coffee ritual.
        </p>
      </div>
    </header>
  );
}
