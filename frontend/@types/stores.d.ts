declare interface ExchangeStore {
  tickers: string[]
  chartOptions: ChartOptions[]
  exchangeInfo: ExchangeInfo
  fetchTickers(): Promise<void>
  updateChartOptions(chartOptions: ChartOptions): Promise<void>
}