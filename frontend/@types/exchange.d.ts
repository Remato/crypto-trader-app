declare type ExchangeInfo = {
  timezone: string,
  symbols: ExchangeSymbol[]
}

declare type ExchangeSymbol = {
  symbol: string,
  status: string,
  baseAsset: string,
  baseAssetPrecision: number,
  quoteAsset: string,
  quotePrecision: number,
  quoteAssetPrecision: number,
  orderTypes: string[],
  icebergAllowed: boolean,
  ocoAllowed: boolean,
  quoteOrderQtyMarketAllowed: boolean,
  allowTrailingStop: boolean,
  cancelReplaceAllowed: boolean,
  isSpotTradingAllowed: boolean,
  isMarginTradingAllowed: boolean,
}