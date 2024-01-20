import React from "react";

import Column from "./column";
import { items } from "./data";
import { Status } from "./types";

export default function Board(): JSX.Element {
  return (
    <div className="mx-auto px-4 flex flex-col max-w-lg space-y-6 lg:space-y-0 lg:flex-row lg:max-w-6xl lg:space-x-6 mt-14">
      <Column
        status={Status.PLANNING}
        items={items.filter((item) => item.status === "planning")}
      />
      <Column
        status={Status.IN_PROGRESS}
        items={items.filter((item) => item.status === "in-progress")}
      />
      <Column
        status={Status.UPCOMING}
        items={items.filter((item) => item.status === "upcoming")}
      />
    </div>
  );
}
