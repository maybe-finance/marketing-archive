export interface AssetRowDto {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface AssetDto {
  symbol: string;
  currency: string;
  exchange: string;
  type: string;
  rows: AssetRowDto[];
}
