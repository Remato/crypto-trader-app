import axios from "axios"

export const fetchBinanceTickers = async (): Promise<ExchangeInfo> => {
  try {
    const { data } = await axios.get(`http://localhost:3001/tickers`)
    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchTickers', error)
    throw (error as Error).message
  }
}

export const fetchBinanceCandles = async (
  symbol: string, 
  interval: string
): Promise<string[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3001/uiKlines?symbol=${symbol.toUpperCase()}&interval=${interval}`)
    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchuiKlines', error)
    throw (error as Error).message
  }
}

export const fetchBinanceLines = async (
  symbol: string, 
  interval: string
): Promise<string[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3001/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`)
    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchKlines', error)
    throw (error as Error).message
  }
}