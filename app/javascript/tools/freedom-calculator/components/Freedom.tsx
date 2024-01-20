import React from "react";
import Confetti from "../../../components/Confetti";

export default function Freedom(): JSX.Element {
  return (
    <>
      <div
        role="heading"
        className="text-xl text-center font-bold leading-tight font-display text-white"
      >
        Freedom Calls!
      </div>
      <div className="w-full py-10 md:px-32">
        <div className="w-full text-center rounded-sm overflow-hidden">
          <video
            src="/videos/freedom-calculator/freedom.mp4"
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="mt-6 text-lg text-white">
            Keep doing what you&apos;re doing and you will never run out of
            money.
          </div>
        </div>
      </div>
      <Confetti className="opacity-70" />
    </>
  );
}
