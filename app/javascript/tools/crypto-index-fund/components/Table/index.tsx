import React from "react";
import type { Row as RowType } from "../../types";
import type { WeightsHook } from "../../useWeights";
import Row from "./Row";
import AutoAdjustButton from "./AutoAdjustButton";
export interface TableProps {
  rows: RowType[];
  weights: WeightsHook;
}

export default function Table({ rows, weights }: TableProps): JSX.Element {
  return (
    <div className="overflow-x-scroll custom-scrollbar">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-gray-600 text-sm font-normal">
            <th className="text-left font-normal">Name</th>
            <th className="text-right font-normal pl-4">Price</th>
            <th className="text-right font-normal pl-4">Market Cap</th>
            <th className="text-right font-normal pl-4">
              <AutoAdjustButton weights={weights} />
            </th>
            <th className="text-right font-normal pl-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row row={row} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
