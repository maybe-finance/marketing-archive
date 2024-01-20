import React from "react";

export default function Header(): JSX.Element {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-2 text-center">
      <img
        src="/img/roadmap/illustration.png"
        className="pt-10 mx-auto max-w-xl w-full"
      />
      <h1 className="font-display font-extrabold text-2xl md:text-5xl leading-heading">
        Roadmap
      </h1>
      <div className="mx-auto mt-5 block max-w-xl text-base md:text-lg text-gray-100 space-y-8">
        <p>
          Maybe is in the earliest stages as both a product and a company. The
          product you see today isn’t the product we ultimately envision, but to
          get to end point, we have to have a starting point.
        </p>
        <p>
          This roadmap will hopefully serve as a way to see just how much is in
          the works in the short and mid term, as well as provide some things to
          look forward to 🙂
        </p>
      </div>
    </header>
  );
}
