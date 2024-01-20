import React from "react";

import Host from "./host";
import config from "./config";

export default function Hosts(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-teal bg-opacity-10 ri-mic-fill text-teal ri-2x" />
      <h2 className="font-display mt-10 font-extrabold text-2xl md:text-4xl leading-heading">
        Your hosts
      </h2>
      <div className="flex flex-col sm:flex-row mt-8 gap-8">
        {config.hosts.map((host) => (
          <Host host={host} key={host.name} />
        ))}
      </div>
    </div>
  );
}
