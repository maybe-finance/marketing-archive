import React from "react";

import EarlyAccessFooterAppIcon from "./components/app-icon";

export default function EarlyAccessFooter(): JSX.Element {
  return (
    <aside className="px-4 py-4 bg-full-black rounded-3xl sm:py-16 space-y-8">
      <div className="flex flex-col items-center justify-start max-w-xs mx-auto text-center">
        <EarlyAccessFooterAppIcon />
        <h2 className="font-display text-2xl font-semibold">
          <span className="block gradient-heading">Turn your maybe</span>
          <span className="block gradient-heading">into a sure thing</span>
        </h2>
        <p className="text-gray-100">
          Get started with Maybe and start realizing your financial dreams.
        </p>
        <a
          href="https://app.maybe.co/register"
          className="mt-7 py-2 px-4 font-medium text-base text-black bg-white hover:bg-gray-25 rounded-lg transition-colors duration-50"
        >
          Get Started
        </a>
      </div>
    </aside>
  );
}
