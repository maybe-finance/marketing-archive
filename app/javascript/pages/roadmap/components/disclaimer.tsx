import React from "react";

export default function Disclaimer(): JSX.Element {
  return (
    <div className="px-4 mx-auto max-w-xl mt-14">
      <div className="bg-black relative z-10">
        <div className="overflow-hidden rounded-2xl bg-orange bg-opacity-10">
          <div className="flex items-center space-x-2 text-black bg-yellow px-6 py-4 ">
            <i className="ri ri-xl ri-calendar-line"></i>
            <h3 className="text-sm font-semibold  uppercase ">
              When are you releasing [x]?
            </h3>
          </div>

          <p className="p-6">
            We’ve chosen to{" "}
            <b className="font-semibold">leave time estimates out</b> as we’d
            really only be setting ourselves up for unmet expectations. There
            are far too many unknowable variables to really properly estimate
            time more than a few weeks out. Just know we’re working on these
            things as fast as possible given finite time and money.
          </p>
        </div>
      </div>
    </div>
  );
}
