<script setup lang="ts">
import type { GridSize, StreamBingoDraftPayload, StreamBingoPayload } from '~/utils/bingoPayload'
import {
  PAYLOAD_VERSION,
  decodeDraftPayload,
  encodeDraftPayload,
  encodePayload,
} from '~/utils/bingoPayload'
import { QUICK_HABIT_IDEAS } from '~/data/habitIdeas'
import { deriveCells, parseWordList } from '~/utils/streamBingo'
import { randomSeed } from '~/utils/streamRandom'

useHead({ title: 'Karte bauen' })

const size = ref<GridSize>(5)
const rawPool = ref('')
/** Ohne Mischen: feste Listen-Reihenfolge, kein Seed im Payload. Erst „Mischen“ setzt sh + Seed. */
const shuffle = ref(false)
const seed = ref(0)
const modalMoreOpen = ref(false)
const shareModalOpen = ref(false)
const resetModalOpen = ref(false)

const route = useRoute()
const router = useRouter()
const { copyLink } = useShareBingoLink()

const urlSyncReady = ref(false)
const lastEncodedD = ref<string | null>(null)
let urlDebounce: ReturnType<typeof setTimeout> | null = null

const needCount = computed(() => size.value * size.value)

const pool = computed(() => parseWordList(rawPool.value))

const poolFull = computed(() => pool.value.length >= needCount.value)

const valid = computed(() => {
  const n = pool.value.length
  const need = needCount.value
  if (n !== need) return false
  if (!pool.value.every((t) => t.length > 0)) return false
  if (shuffle.value && !Number.isFinite(seed.value)) return false
  return true
})

const validationMessage = computed(() => {
  const n = pool.value.length
  const need = needCount.value
  if (n === 0) return `${need} Einträge nötig.`
  if (n > need) return `Max. ${need}.`
  if (n < need) return `Noch ${need - n}.`
  if (!pool.value.every((t) => t.length > 0)) return 'Leere Zeile.'
  return ''
})

/** Text im Warn-Button: fehlende Anzahl, sonst Kurzgrund. */
const invalidPlayLabel = computed(() => {
  const n = pool.value.length
  const need = needCount.value
  if (n < need) {
    const m = need - n
    return m === 1 ? 'Noch 1 Begriff' : `Noch ${m} Begriffe`
  }
  return validationMessage.value
})

watch(
  () => [rawPool.value, needCount.value] as const,
  () => {
    const items = parseWordList(rawPool.value)
    const need = needCount.value
    if (items.length <= need) return
    rawPool.value = items.slice(0, need).join('\n')
  },
  { flush: 'post' },
)

const previewMarked = new Set<number>()

const previewPayload = computed((): StreamBingoPayload | null => {
  if (!valid.value) return null
  return {
    v: PAYLOAD_VERSION,
    t: 'card',
    s: size.value,
    pool: [...pool.value],
    sh: shuffle.value,
    seed: shuffle.value ? (seed.value >>> 0) : 0,
  }
})

const previewCells = computed(() => {
  const p = previewPayload.value
  if (!p) return []
  return deriveCells(p)
})

function appendPhrase(phrase: string) {
  const t = phrase.trim()
  if (!t) return
  if (pool.value.length >= needCount.value) return
  const cur = rawPool.value.replace(/\s+$/, '')
  rawPool.value = cur ? `${cur}\n${t}` : t
}

function buildDraftPayload(): StreamBingoDraftPayload {
  const items = parseWordList(rawPool.value)
  const need = needCount.value
  return {
    v: PAYLOAD_VERSION,
    t: 'draft',
    s: size.value,
    sh: shuffle.value,
    seed: shuffle.value ? (seed.value >>> 0) : 0,
    pool: items.slice(0, need),
  }
}

function applyDraft(p: StreamBingoDraftPayload) {
  size.value = p.s
  shuffle.value = p.sh
  seed.value = p.sh ? (p.seed >>> 0) : 0
  rawPool.value = p.pool.length ? p.pool.join('\n') : ''
}

function buildPayload(): StreamBingoPayload {
  return {
    v: PAYLOAD_VERSION,
    t: 'card',
    s: size.value,
    pool: [...pool.value],
    sh: shuffle.value,
    seed: shuffle.value ? (seed.value >>> 0) : 0,
  }
}

function queueUrlSync() {
  if (!urlSyncReady.value) return
  if (urlDebounce) clearTimeout(urlDebounce)
  urlDebounce = setTimeout(() => {
    urlDebounce = null
    const d = encodeDraftPayload(buildDraftPayload())
    const cur = route.query.d
    const curS = Array.isArray(cur) ? cur[0] : cur
    if (curS === d) return
    lastEncodedD.value = d
    router.replace({ path: route.path, query: { d } })
  }, 320)
}

watch([rawPool, size, shuffle, seed], () => queueUrlSync())

watch(
  () => route.query.d,
  () => {
    if (!urlSyncReady.value) return
    const d = route.query.d
    const raw = typeof d === 'string' ? d : Array.isArray(d) ? d[0] : undefined
    if (typeof raw !== 'string' || !raw.length) return
    if (raw === lastEncodedD.value) return
    const draft = decodeDraftPayload(raw)
    if (draft) {
      applyDraft(draft)
      lastEncodedD.value = raw
    }
  },
)

onMounted(() => {
  const d = route.query.d
  const raw = typeof d === 'string' ? d : Array.isArray(d) ? d[0] : undefined
  if (typeof raw === 'string' && raw.length) {
    const draft = decodeDraftPayload(raw)
    if (draft) {
      applyDraft(draft)
      lastEncodedD.value = raw
    }
  }
  nextTick(() => {
    urlSyncReady.value = true
    queueUrlSync()
  })
})

function mischen() {
  shuffle.value = true
  seed.value = randomSeed()
}

function useListOrder() {
  shuffle.value = false
  seed.value = 0
}

function buildInvitePayload(): StreamBingoPayload {
  const b = buildPayload()
  return {
    ...b,
    sh: true,
    seed: randomSeed() >>> 0,
  }
}

async function shareOwnSeed(ev?: MouseEvent) {
  if (!valid.value) return
  await copyLink('/play', buildPayload(), ev)
  shareModalOpen.value = false
}

async function shareInvitePlay(ev?: MouseEvent) {
  if (!valid.value) return
  await copyLink('/play', buildInvitePayload(), ev)
  shareModalOpen.value = false
}

function closeShareModal() {
  shareModalOpen.value = false
}

function goPlay() {
  if (!valid.value) return
  navigateTo({ path: '/play', query: { d: encodePayload(buildPayload()) } })
}

function closeResetModal() {
  resetModalOpen.value = false
}

function confirmResetBuilder() {
  resetModalOpen.value = false
  size.value = 5
  rawPool.value = ''
  shuffle.value = false
  seed.value = 0
  if (urlDebounce) {
    clearTimeout(urlDebounce)
    urlDebounce = null
  }
  const d = encodeDraftPayload(buildDraftPayload())
  lastEncodedD.value = d
  router.replace({ path: '/', query: { d } })
}
</script>

<template>
  <main class="mx-auto w-full max-w-6xl flex-1 px-2 pb-12">
    <h1 class="sr-only">Karte bauen</h1>
    <div class="grid gap-8 lg:grid-cols-[1fr_min(100%,280px)] lg:items-start">
      <div>
        <div class="space-y-5 rounded-xl border border-white/10 bg-eerie-black p-5 pt-4 shadow-lg">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <fieldset class="min-w-0 flex-1 border-0 p-0">
              <legend class="sr-only">Raster</legend>
              <div class="flex flex-wrap items-center gap-5 text-sm text-gray-200">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="size" type="radio" name="sz" :value="3" class="accent-moonstone" />
                  3×3
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="size" type="radio" name="sz" :value="5" class="accent-moonstone" />
                  5×5
                </label>
              </div>
            </fieldset>
            <div class="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                class="rounded-lg border border-white/10 p-2 text-dim-gray hover:border-amber-500/50 hover:bg-amber-950/30 hover:text-amber-200"
                aria-label="Neu anfangen"
                title="Karte leeren und Einstellungen zurücksetzen"
                @click="resetModalOpen = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="h-5 w-5"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                type="button"
                class="rounded-lg border border-white/10 p-2 text-moonstone hover:border-moonstone/45 hover:bg-night/80"
                aria-label="Teilen"
                aria-haspopup="dialog"
                :aria-expanded="shareModalOpen"
                @click="shareModalOpen = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-lg border border-white/15 bg-night px-3 py-2 text-sm font-medium text-gray-200 hover:border-moonstone/40"
              @click="mischen"
            >
              Mischen
            </button>
            <button
              v-if="shuffle"
              type="button"
              class="px-2 py-1.5 text-xs text-dim-gray hover:text-gray-300"
              @click="useListOrder"
            >
              Wie Liste
            </button>
          </div>

          <div>
            <label for="pool" class="sr-only">Phrasen</label>
            <span id="pool-hint" class="sr-only">
              Exakt {{ needCount }} Einträge, eine Zeile pro Begriff oder kommagetrennt in einer Zeile.
            </span>
            <textarea
              id="pool"
              v-model="rawPool"
              rows="10"
              class="w-full rounded-lg border border-white/15 bg-night px-3 py-2 text-sm text-gray-100 placeholder:text-dim-gray focus:border-moonstone/50 focus:outline-none focus:ring-1 focus:ring-moonstone/40"
              :placeholder="`${needCount} Phrasen`"
              aria-label="Phrasen"
              aria-describedby="pool-hint play-cta-announcer"
            />
          </div>

          <div v-if="valid && previewPayload" class="rounded-lg border border-white/10 bg-night/50 p-3">
            <p class="sr-only">Vorschau</p>
            <StreamBingoGrid
              class="mt-3 !max-w-none !ring-0 !ring-offset-0"
              :size="size"
              :cells="previewCells"
              :marked="previewMarked"
              readonly
            />
          </div>

          <div class="flex flex-col gap-1">
            <span id="play-cta-announcer" class="sr-only" aria-live="polite">
              {{ valid ? 'Karte fertig — Jetzt loslegen möglich.' : validationMessage }}
            </span>
            <button
              v-if="valid"
              type="button"
              class="w-full rounded-lg border border-moonstone/50 bg-gradient-to-b from-dark-slate-gray to-eerie-black px-4 py-2.5 text-sm font-semibold text-white shadow-md ring-2 ring-moonstone/25 hover:brightness-110 sm:w-auto"
              @click="goPlay"
            >
              Jetzt loslegen
            </button>
            <button
              v-else
              type="button"
              disabled
              class="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-amber-500/45 bg-amber-950/35 px-4 py-2.5 text-sm font-semibold text-amber-100 sm:w-auto"
              :title="validationMessage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-5 w-5 shrink-0 text-amber-400"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              {{ invalidPlayLabel }}
            </button>
          </div>
        </div>
      </div>

      <aside class="lg:sticky lg:top-4">
        <p class="mb-2 text-xs font-medium text-dim-gray">Schnell</p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="(habit, i) in QUICK_HABIT_IDEAS"
            :key="i"
            type="button"
            class="rounded-md border border-white/10 bg-night/90 px-2 py-1.5 text-left text-xs text-gray-200 hover:border-moonstone/45 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="poolFull"
            @click="appendPhrase(habit)"
          >
            {{ habit }}
          </button>
          <button
            type="button"
            class="rounded-md border border-amber-500/55 bg-amber-950/35 px-2.5 py-1.5 text-xs font-semibold text-amber-100 hover:border-amber-400/80 hover:bg-amber-950/50 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="poolFull"
            @click="modalMoreOpen = true"
          >
            Mehr…
          </button>
        </div>
      </aside>
    </div>

    <HabitsIdeasModal v-model:open="modalMoreOpen" @add="appendPhrase" />

    <Teleport to="body">
      <div
        v-if="shareModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
        role="presentation"
      >
        <div
          class="w-full max-w-sm rounded-xl border border-white/10 bg-eerie-black p-4 shadow-2xl ring-2 ring-moonstone/35"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          @click.stop
        >
          <div class="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
            <h2 id="share-modal-title" class="text-sm font-semibold text-white">Teilen</h2>
            <button
              type="button"
              class="shrink-0 rounded-lg border border-white/15 bg-night px-2.5 py-1 text-xs font-medium text-gray-200 hover:border-moonstone/50 hover:text-white"
              @click="closeShareModal"
            >
              Schließen
            </button>
          </div>
          <p v-if="!valid" class="mt-3 text-xs text-amber-400/90">Erst Karte fertigstellen — dann kannst du teilen.</p>
          <div class="mt-4 flex flex-col gap-2">
            <button
              type="button"
              class="w-full rounded-lg border border-white/15 bg-night px-3 py-2.5 text-left text-sm font-medium text-gray-200 hover:border-moonstone/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!valid"
              title="Gleiche Anordnung wie deine Vorschau."
              @click="shareOwnSeed($event)"
            >
              Diese Karte teilen
            </button>
            <button
              type="button"
              class="w-full rounded-lg border border-white/15 bg-night px-3 py-2.5 text-left text-sm font-medium text-gray-200 hover:border-moonstone/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!valid"
              title="Neue Zufalls-Anordnung nur im Link — gleicher Pool. Dein Formular bleibt unverändert."
              @click="shareInvitePlay($event)"
            >
              Jemanden mitspielen lassen
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div
        v-if="resetModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
        role="presentation"
      >
        <div
          class="w-full max-w-sm rounded-xl border border-white/10 bg-eerie-black p-4 shadow-2xl ring-2 ring-amber-500/35"
          role="dialog"
          aria-modal="true"
          aria-labelledby="builder-reset-modal-title"
          @click.stop
        >
          <h2 id="builder-reset-modal-title" class="text-sm font-semibold text-white">Neu anfangen?</h2>
          <p class="mt-3 text-sm text-dim-gray">
            Bist du sicher, dass du neu anfangen willst? Alle Phrasen und Einstellungen werden gelöscht und die Adresse
            setzt sich zurück.
          </p>
          <div class="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-white/15 bg-night px-3 py-2 text-sm font-medium text-gray-200 hover:border-moonstone/40 hover:text-white"
              @click="closeResetModal"
            >
              Abbrechen
            </button>
            <button
              type="button"
              class="rounded-lg border border-amber-500/55 bg-amber-950/50 px-3 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-950/70"
              @click="confirmResetBuilder"
            >
              Neu anfangen
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>
