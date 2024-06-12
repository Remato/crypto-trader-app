export function parseLines(data: string[]): Line[] {
  const parsedLines: Line[] = data.map((k) => {
    return {
      timestamp: +k[0],
      value: parseFloat(k[4]),
    } as Line
  })

  return parsedLines
}