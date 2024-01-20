import React from "react";

export default function Legend(): JSX.Element {
  return (
    <div className="flex gap-x-10 mb-2">
      <div className="flex items-center gap-2.5">
        <div className="w-1 h-2.5 bg-white rounded-sm"></div>
        <div className="text-gray-200 text-sm">Contribute</div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="w-1 h-2.5 bg-red rounded-sm"></div>
        <div className="text-gray-200 text-sm">Interest</div>
      </div>
    </div>
  );
}
