import { parseLines } from '@/utils/parseLines'
import { parseCandles } from '@/utils/parseCandles'
import { fetchBinanceCandles, fetchBinanceLines } from '@/api/binance'

export async function getCandles(
  symbol: string, 
  interval: string
): Promise<Candle[]>{
  const data = await fetchBinanceCandles(symbol, interval)
  const candles = parseCandles(data)
  return candles
}

export async function getLines(
  symbol: string, 
  interval: string
): Promise<Line[]>{
  const data = await fetchBinanceLines(symbol, interval)
  const lines = parseLines(data)
  return lines
}