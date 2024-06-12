import { create } from 'zustand'
import { fetchBinanceTickers } from '@/api/binance'

export const useExchange = create<ExchangeStore>()((set, get) => ({
  tickers: [],

  chartOptions: [],
  
  exchangeInfo: {} as ExchangeInfo,

  fetchTickers: async (): Promise<void> => {
    const { symbols } = await fetchBinanceTickers()
    const tickers = symbols.map(symbol => symbol.symbol);
    set(() => ({ tickers }))
  },

  updateChartOptions: async (
    chartOption: ChartOptions
  ): Promise<void> => {
    const chartIndex = get()
      .chartOptions.findIndex(({ market }) => market === chartOption.market)

    if(chartIndex) {
      const updatedOptions = get().chartOptions
      updatedOptions[chartIndex] = chartOption
      set(() => ({ chartOptions: updatedOptions }))
    } else {
      set(() => ({ chartOptions: [...get().chartOptions, chartOption] }))
    }
  },
}))
