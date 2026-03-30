export function marksToPayload(marked: Set<number>): number[] | undefined {
  const arr = [...marked].sort((a, b) => a - b).filter((i) => i >= 0)
  return arr.length ? arr : undefined
}

export function marksFromPayload(m: number[] | undefined, maxExclusive: number): Set<number> {
  const s = new Set<number>()
  if (!m) return s
  for (const i of m) {
    if (Number.isInteger(i) && i >= 0 && i < maxExclusive) s.add(i)
  }
  return s
}
