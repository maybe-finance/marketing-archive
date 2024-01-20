import React, { useCallback } from "react";
import Confetti from "../../../components/Confetti";

export default function Broke(): JSX.Element {
  const extendGenerateParticleEmoji = useCallback((particle) => {
    const size = 20 + Math.random() * 20;
    return {
      ...particle,
      width: size,
      height: size,
      velocityY: -Math.random() * 5 - 5, // Slowly fly up without too much variation
    };
  }, []);

  const renderParticleEmoji = useCallback((particle, context) => {
    context.font = `${particle.width}px sans-serif`;
    context.fillText("💸", 0, 0);
  }, []);

  return (
    <>
      <div
        role="heading"
        className="text-xl text-center font-bold leading-tight font-display text-white"
      >
        Ouch, you will run out of money soon!
      </div>
      <div className="w-full py-10 md:px-32">
        <div className="w-full text-center rounded-sm overflow-hidden">
          <video
            src="/videos/freedom-calculator/broke.mp4"
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="mt-6 text-lg text-white">
            But don&apos;t worry, we are here to help.
          </div>
        </div>
      </div>
      <Confetti
        amount={20}
        respawn={false}
        gravity={-0.05}
        sway={0}
        rotate={false}
        extendGenerateParticle={extendGenerateParticleEmoji}
        renderParticle={renderParticleEmoji}
        className="opacity-70"
      />
    </>
  );
}
