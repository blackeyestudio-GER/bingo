import type { BingoPayload } from '~/utils/bingoPayload'
import { encodePayload } from '~/utils/bingoPayload'

let copyToastHideTimer: ReturnType<typeof setTimeout> | null = null

type Point = { x: number; y: number }

/** Call from ShareCopyToast: keeps last pointer for fallback when copy runs without a click event. */
export function useShareCopyPointerTracking() {
  const copyPointer = useState('bingo-share-pointer', () => ({
    x: null as number | null,
    y: null as number | null,
  }))

  function onPointerMove(e: PointerEvent) {
    copyPointer.value = { x: e.clientX, y: e.clientY }
  }

  onMounted(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })
}

export function useShareBingoLink() {
  const router = useRouter()
  const copyPointer = useState('bingo-share-pointer', () => ({
    x: null as number | null,
    y: null as number | null,
  }))
  const copyToastActive = useState('bingo-share-copy-toast-active', () => false)
  const copyToastNonce = useState('bingo-share-copy-toast-nonce', () => 0)
  const copyToastAnchor = useState('bingo-share-copy-toast-anchor', (): Point => ({ x: 0, y: 0 }))

  function resolveAnchor(source?: MouseEvent | PointerEvent | null): Point {
    if (!import.meta.client) {
      return { x: 0, y: 0 }
    }
    if (source && Number.isFinite(source.clientX) && Number.isFinite(source.clientY)) {
      // Tastatur-Aktivierung liefert oft 0,0 — dann lieber Pointer/Button.
      if (source.clientX !== 0 || source.clientY !== 0) {
        return { x: source.clientX, y: source.clientY }
      }
    }
    const p = copyPointer.value
    if (p.x != null && p.y != null) {
      return { x: p.x, y: p.y }
    }
    const el = document.activeElement
    if (el instanceof HTMLElement && el.tagName === 'BUTTON') {
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  }

  function flashCopyToast() {
    if (!import.meta.client) return
    if (copyToastHideTimer) {
      clearTimeout(copyToastHideTimer)
      copyToastHideTimer = null
    }
    copyToastNonce.value += 1
    copyToastActive.value = true
    copyToastHideTimer = setTimeout(() => {
      copyToastActive.value = false
      copyToastHideTimer = null
    }, 2200)
  }

  function toClipboardUrl(path: string, payload: BingoPayload): string {
    const d = encodePayload(payload)
    const resolved = router.resolve({ path, query: { d } })
    if (!import.meta.client) return resolved.href
    return new URL(resolved.href, window.location.origin).href
  }

  async function copyLink(
    path: string,
    payload: BingoPayload,
    source?: MouseEvent | PointerEvent | null,
  ) {
    const url = toClipboardUrl(path, payload)
    const anchor = resolveAnchor(source ?? null)
    try {
      await navigator.clipboard.writeText(url)
      copyToastAnchor.value = anchor
      flashCopyToast()
    } catch {
      prompt('Copy this link:', url)
    }
  }

  return { copyLink, toClipboardUrl }
}
