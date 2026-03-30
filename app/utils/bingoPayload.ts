export const PAYLOAD_VERSION = 1 as const

export type GridSize = 3 | 5

/** Single card format: word pool + optional shuffle (seed). */
export interface StreamBingoPayload {
  v: typeof PAYLOAD_VERSION
  t: 'card'
  s: GridSize
  /** Phrases; first s×s used in list order if sh=false, else pool is shuffled and first s×s fill the grid */
  pool: string[]
  /** When true, `seed` controls shuffle; when false, order is pool[0..s*s-1] */
  sh: boolean
  /** Meaningful when sh=true (uint32). Stored as 0 when sh=false */
  seed: number
  m?: number[]
}

export type BingoPayload = StreamBingoPayload

/** Builder / Lesezeichen: gleiche Felder wie Karte, Pool darf kürzer als s×s sein. */
export interface StreamBingoDraftPayload {
  v: typeof PAYLOAD_VERSION
  t: 'draft'
  s: GridSize
  sh: boolean
  seed: number
  pool: string[]
}

/** @deprecated legacy types for decode migration only */
interface PunishmentPayload {
  v: typeof PAYLOAD_VERSION
  t: 'punish'
  s: GridSize
  c: string[]
  m?: number[]
}

/** @deprecated legacy types for decode migration only */
interface EventsPayload {
  v: typeof PAYLOAD_VERSION
  t: 'events'
  s: GridSize
  seed: number
  pool: string[]
  m?: number[]
}

function payloadToBase64(json: string): string {
  const utf8 = new TextEncoder().encode(json)
  let bin = ''
  for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]!)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function encodePayload(data: StreamBingoPayload): string {
  return payloadToBase64(JSON.stringify(data))
}

export function encodeDraftPayload(data: StreamBingoDraftPayload): string {
  return payloadToBase64(JSON.stringify(data))
}

export function decodePayload(d: string): StreamBingoPayload | null {
  try {
    let b64 = d.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const bin = atob(b64)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    const raw = JSON.parse(json) as Record<string, unknown>
    if (raw.v !== PAYLOAD_VERSION) return null

    if (raw.t === 'draft') {
      return null
    }

    if (raw.t === 'card' && isCardPayload(raw)) {
      return {
        v: PAYLOAD_VERSION,
        t: 'card',
        s: raw.s as GridSize,
        pool: raw.pool as string[],
        sh: raw.sh as boolean,
        seed: ((raw.seed as number) ?? 0) >>> 0,
        ...(Array.isArray(raw.m) ? { m: raw.m as number[] } : {}),
      }
    }

    if (raw.t === 'punish' && isPunishmentPayload(raw)) {
      const p = raw as unknown as PunishmentPayload
      return {
        v: PAYLOAD_VERSION,
        t: 'card',
        s: p.s,
        pool: [...p.c],
        sh: false,
        seed: 0,
        ...(p.m?.length ? { m: p.m } : {}),
      }
    }

    if (raw.t === 'events' && isEventsPayload(raw)) {
      const p = raw as unknown as EventsPayload
      return {
        v: PAYLOAD_VERSION,
        t: 'card',
        s: p.s,
        pool: [...p.pool],
        sh: true,
        seed: p.seed >>> 0,
        ...(p.m?.length ? { m: p.m } : {}),
      }
    }

    return null
  } catch {
    return null
  }
}

function isDraftPayload(x: Record<string, unknown>): boolean {
  const s = x.s
  if (s !== 3 && s !== 5) return false
  if (typeof x.sh !== 'boolean') return false
  const n = (s as number) * (s as number)
  const pool = x.pool
  if (!Array.isArray(pool) || !pool.every((t) => typeof t === 'string')) return false
  if (pool.length > n) return false
  const seed = x.seed
  if (x.sh === true) {
    if (typeof seed !== 'number' || !Number.isFinite(seed)) return false
  }
  return true
}

export function decodeDraftPayload(d: string): StreamBingoDraftPayload | null {
  let raw: Record<string, unknown>
  try {
    let b64 = d.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const bin = atob(b64)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    raw = JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
  if (raw.v !== PAYLOAD_VERSION) return null
  if (raw.t === 'draft' && isDraftPayload(raw)) {
    return {
      v: PAYLOAD_VERSION,
      t: 'draft',
      s: raw.s as GridSize,
      sh: raw.sh as boolean,
      seed: ((raw.seed as number) ?? 0) >>> 0,
      pool: [...(raw.pool as string[])],
    }
  }
  const card = decodePayload(d)
  if (!card) return null
  return {
    v: PAYLOAD_VERSION,
    t: 'draft',
    s: card.s,
    sh: card.sh,
    seed: card.sh ? card.seed >>> 0 : 0,
    pool: [...card.pool],
  }
}

function isCardPayload(x: Record<string, unknown>): boolean {
  const s = x.s
  if (s !== 3 && s !== 5) return false
  const pool = x.pool
  if (!Array.isArray(pool) || !pool.every((t) => typeof t === 'string')) return false
  const n = (s as number) * (s as number)
  if (pool.length < n) return false
  if (typeof x.sh !== 'boolean') return false
  const seed = x.seed
  if (x.sh === true) {
    if (typeof seed !== 'number' || !Number.isFinite(seed)) return false
  } else if (seed !== undefined && (typeof seed !== 'number' || !Number.isFinite(seed))) {
    return false
  }
  if (x.m !== undefined) {
    if (!Array.isArray(x.m) || !x.m.every((i) => typeof i === 'number' && Number.isInteger(i)))
      return false
  }
  return true
}

function isPunishmentPayload(x: Record<string, unknown>): x is PunishmentPayload {
  const s = x.s
  const c = x.c
  if (s !== 3 && s !== 5) return false
  if (!Array.isArray(c) || c.length !== s * s) return false
  if (!c.every((t) => typeof t === 'string')) return false
  if (x.m !== undefined) {
    if (!Array.isArray(x.m) || !x.m.every((i) => typeof i === 'number' && Number.isInteger(i)))
      return false
  }
  return true
}

function isEventsPayload(x: Record<string, unknown>): x is EventsPayload {
  const s = x.s
  const pool = x.pool
  const seed = x.seed
  if (s !== 3 && s !== 5) return false
  if (typeof seed !== 'number' || !Number.isFinite(seed)) return false
  if (!Array.isArray(pool) || pool.length < (s as number) * (s as number)) return false
  if (!pool.every((t) => typeof t === 'string')) return false
  if (x.m !== undefined) {
    if (!Array.isArray(x.m) || !x.m.every((i) => typeof i === 'number' && Number.isInteger(i)))
      return false
  }
  return true
}
