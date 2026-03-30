import type { StreamBingoPayload } from './bingoPayload'

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleCopy<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Deterministic shuffle; same seed and pool always yields the same order. */
export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  return shuffleCopy(items, mulberry32(seed >>> 0))
}

/** First n cells on the card from shuffled pool. */
export function cellsFromPool(pool: string[], size: 3 | 5, seed: number): string[] {
  const n = size * size
  const shuffled = shuffleWithSeed([...pool], seed)
  return shuffled.slice(0, n)
}

export function deriveCells(p: StreamBingoPayload): string[] {
  const n = p.s * p.s
  if (!p.sh) return p.pool.slice(0, n)
  return cellsFromPool(p.pool, p.s, p.seed >>> 0)
}

/** All row / col / diagonal lines as index arrays (flat grid). */
export function bingoLines(size: number): number[][] {
  const lines: number[][] = []
  for (let r = 0; r < size; r++) {
    lines.push(Array.from({ length: size }, (_, c) => r * size + c))
  }
  for (let c = 0; c < size; c++) {
    lines.push(Array.from({ length: size }, (_, r) => r * size + c))
  }
  lines.push(Array.from({ length: size }, (_, i) => i * (size + 1)))
  lines.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1)))
  return lines
}

export function completedLines(size: number, marked: Set<number>): number[][] {
  return bingoLines(size).filter((line) => line.every((i) => marked.has(i)))
}

export function hasBingo(size: number, marked: Set<number>): boolean {
  return completedLines(size, marked).length > 0
}

/** Split user input: lines first; if single line, split on commas. */
export function parseWordList(raw: string): string[] {
  const lines = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (lines.length === 1 && lines[0]!.includes(',')) {
    return lines[0]!
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return lines
}
