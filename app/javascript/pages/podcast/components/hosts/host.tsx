import React from "react";

import { Host as HostType } from "../../types";

type HostProps = {
  host: HostType;
};

export default function Host({ host }: HostProps): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <img src={host.avatar} className="mb-6 rounded-3xl w-30 h-30" />
      <div className="text-center font-display font-black text-xl sm:text-2xl">
        {host.name}
      </div>
      <div className="text-center text-lg text-gray-300">{host.bio}</div>
    </div>
  );
}
