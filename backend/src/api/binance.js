import axios from 'axios'

export const fetchBinanceTickers = async () => {
  try {
    const { data } = await axios.get(`${process.env.BINANCE_BASE_URL}/exchangeInfo`)
    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchExchangeInfo', error)
    throw (error).message
  }
}

export const fetchBinanceCandleChart = async (symbol, interval) => {
  try {
    const { data } = await axios.get(`${process.env.BINANCE_BASE_URL}/uiKlines?symbol=${symbol}&interval=${interval}&limit=30`)

    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchuiKlines', error)
    throw (error).message
  }
}

export const fetchBinanceLineChart = async (symbol, interval) => {
  try {
    const { data } = await axios.get(`${process.env.BINANCE_BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=60`)

    return data
  } catch (error) {
    console.error('[API]', '[binance]', 'fetchKlines', error)
    throw (error).message
  }
}
