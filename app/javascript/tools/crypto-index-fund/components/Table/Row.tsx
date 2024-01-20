import React from "react";

import { Slider, SliderVariant } from "../../../../components/slider";
import logoUrl from "../../helpers/logo-url";
import formatter from "../../helpers/formatter";

import type { Row as RowType } from "../../types";

export interface RowProps {
  row: RowType;
}

export default function Row({ row }: RowProps): JSX.Element {
  return (
    <tr className="text-right" data-testid="row">
      <td className="text-left flex space-x-4 items-center py-4 w-full">
        <img
          className="rounded-full w-10 h-10 min-w-10"
          src={logoUrl(row.currency.symbol)}
        />
        <div>
          <div>{row.currency.name}</div>
          <div className="text-sm text-gray-500">{row.currency.symbol}</div>
        </div>
      </td>
      <td className="pl-4">${formatter.currency(row.currency.prices[0])}</td>
      <td className="pl-4">${formatter.currency(row.currency.marketCap, 0)}</td>
      <td className="pl-4">
        <div className="inline-flex items-center">
          <div style={{ width: 240 }}>
            <Slider
              variant={SliderVariant.Red}
              value={row.weight * 100}
              setValue={(value) => row.changeWeight(value / 100)}
              min={0}
              max={100}
              innerMax={row.maxWeight * 100}
              displayValue={true}
              displayValueFormat={(value) => `${value.toFixed(0)}%`}
              displayTooltip={true}
            />
          </div>
        </div>
      </td>
      <td className="pl-4 min-w-32">
        <div>${formatter.currency(row.amountInvested, 0, 0)}</div>
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {`${formatter.currency(row.currencyAmount)} ${row.currency.symbol}`}
        </div>
      </td>
    </tr>
  );
}
