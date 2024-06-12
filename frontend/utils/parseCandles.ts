export function parseCandles(data: string[]): Candle[] {
  const parsedCandles: Candle[] = data.map((k) => {
    return {
      timestamp: +k[0],
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
    } as Candle
  })

  return parsedCandles
}