/** Uniform 32-bit seed; prefers `crypto.getRandomValues` when available. */
export function randomSeed(): number {
  const c = globalThis.crypto
  if (c?.getRandomValues) {
    const buf = new Uint32Array(1)
    c.getRandomValues(buf)
    return buf[0]!
  }
  return (Math.random() * 0x1_0000_0000) >>> 0
}

export function stringToSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
