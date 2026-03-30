<script setup lang="ts">
import type { StreamBingoDraftPayload, StreamBingoPayload } from '~/utils/bingoPayload'
import { PAYLOAD_VERSION, decodePayload, encodeDraftPayload } from '~/utils/bingoPayload'
import { deriveCells, hasBingo } from '~/utils/streamBingo'
import { marksFromPayload, marksToPayload } from '~/utils/marks'

useHead({ title: 'Jetzt loslegen' })

const route = useRoute()
const { copyLink } = useShareBingoLink()

const error = ref<string | null>(null)
const basePayload = ref<StreamBingoPayload | null>(null)
const marked = ref<Set<number>>(new Set())

function loadFromRoute() {
  error.value = null
  const d = route.query.d
  const raw = Array.isArray(d) ? d[0] : d
  if (typeof raw !== 'string' || !raw.length) {
    error.value = 'Keine Karte im Link. Erst auf der Startseite bauen oder geteilten Link nutzen.'
    basePayload.value = null
    marked.value = new Set()
    return
  }
  const p = decodePayload(raw)
  if (!p || p.t !== 'card') {
    error.value = 'Link ungültig oder zu alt.'
    basePayload.value = null
    marked.value = new Set()
    return
  }
  basePayload.value = p
  const n = p.s * p.s
  marked.value = marksFromPayload(p.m, n)
}

watch(() => route.query.d, loadFromRoute, { immediate: true })

const cells = computed(() => {
  const p = basePayload.value
  if (!p) return []
  return deriveCells(p)
})

const size = computed(() => basePayload.value?.s ?? 5)

const bingo = computed(() =>
  basePayload.value ? hasBingo(basePayload.value.s, marked.value) : false,
)

function toggle(i: number) {
  const next = new Set(marked.value)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  marked.value = next
}

function currentPayload(): StreamBingoPayload | null {
  const p = basePayload.value
  if (!p) return null
  const m = marksToPayload(marked.value)
  return {
    ...p,
    ...(m ? { m } : {}),
  }
}

async function shareState(ev?: MouseEvent) {
  const p = currentPayload()
  if (!p) return
  await copyLink('/play', p, ev)
}

function cardPayloadToDraft(p: StreamBingoPayload): StreamBingoDraftPayload {
  return {
    v: PAYLOAD_VERSION,
    t: 'draft',
    s: p.s,
    sh: p.sh,
    seed: p.sh ? p.seed >>> 0 : 0,
    pool: [...p.pool],
  }
}

function goEditCard() {
  const p = basePayload.value
  if (!p) return
  navigateTo({ path: '/', query: { d: encodeDraftPayload(cardPayloadToDraft(p)) } })
}

function goBuilderEmpty() {
  navigateTo({ path: '/' })
}

</script>

<template>
  <main class="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-2 pb-12">
    <h1 class="sr-only">Jetzt loslegen</h1>

    <div class="print:hidden mb-6 flex w-full items-center justify-between gap-3">
      <button
        type="button"
        class="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-night p-2 text-moonstone hover:border-moonstone/45 hover:bg-night/80"
        aria-label="Zurück zum Editor"
        @click="basePayload && !error ? goEditCard() : goBuilderEmpty()"
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <button
        v-if="basePayload && !error"
        type="button"
        class="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-night p-2 text-moonstone hover:border-moonstone/45 hover:bg-night/80"
        aria-label="Teilen"
        title="Teilen"
        @click="shareState($event)"
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

    <div
      v-if="error"
      class="w-full rounded-lg border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100"
    >
      {{ error }}
    </div>

    <template v-else-if="basePayload">
      <StreamBingoGrid :size="size" :cells="cells" :marked="marked" @toggle="toggle" />

      <div
        v-if="bingo"
        class="bingo-win relative mt-10 w-full overflow-hidden rounded-2xl border border-moonstone/35 shadow-lg shadow-black/40"
        role="status"
        aria-live="polite"
      >
        <div class="bingo-win__bg bingo-win__bg--animate" aria-hidden="true" />
        <div class="bingo-win__bg2 bingo-win__bg2--animate" aria-hidden="true" />
        <div class="relative z-[1] flex flex-col items-center gap-4 py-14 px-6 sm:py-16">
          <span class="sr-only">Bingo — eine Reihe ist voll.</span>
          <span class="bingo-win__emoji bingo-win__emoji--a select-none text-[clamp(1.75rem,6vw,2.75rem)] leading-none tracking-wide text-white/90" aria-hidden="true">
            🎉 ✨ 🎊
          </span>
          <p
            class="bingo-win__title text-center font-black uppercase tracking-[0.28em] text-moonstone/95 sm:tracking-[0.35em]"
          >
            Bingo
          </p>
          <span class="bingo-win__emoji bingo-win__emoji--b select-none text-[clamp(1.75rem,6vw,2.75rem)] leading-none tracking-wide text-white/90" aria-hidden="true">
            🥳 🎈 ✨
          </span>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.bingo-win__bg {
  position: absolute;
  inset: -2px;
  opacity: 0.85;
  background: linear-gradient(
    118deg,
    rgba(17, 18, 18, 0.97) 0%,
    rgba(30, 69, 69, 0.88) 22%,
    rgba(58, 161, 189, 0.45) 45%,
    rgba(17, 18, 18, 0.96) 68%,
    rgba(58, 161, 189, 0.38) 88%,
    rgba(30, 69, 69, 0.82) 100%
  );
  background-size: 320% 320%;
}

.bingo-win__bg--animate {
  animation: bingo-bg-flow 16s ease-in-out infinite;
}

.bingo-win__bg2 {
  position: absolute;
  inset: -2px;
  opacity: 0.35;
  mix-blend-mode: soft-light;
  background: radial-gradient(ellipse 80% 60% at 30% 40%, rgba(58, 161, 189, 0.5), transparent 55%),
    radial-gradient(ellipse 70% 50% at 70% 60%, rgba(30, 69, 69, 0.6), transparent 50%);
  background-size: 140% 140%;
}

.bingo-win__bg2--animate {
  animation: bingo-bg-pan 12s ease-in-out infinite alternate;
}

.bingo-win__title {
  font-size: clamp(3rem, 14vw, 5.25rem);
  line-height: 1;
  text-shadow:
    0 0 48px rgba(58, 161, 189, 0.28),
    0 4px 32px rgba(0, 0, 0, 0.55),
    0 1px 0 rgba(255, 255, 255, 0.06);
}

@keyframes bingo-bg-flow {
  0%,
  100% {
    background-position: 12% 40%;
  }
  50% {
    background-position: 88% 60%;
  }
}

@keyframes bingo-bg-pan {
  0% {
    background-position: 0% 0%;
    transform: scale(1);
  }
  100% {
    background-position: 100% 100%;
    transform: scale(1.08);
  }
}

.bingo-win__emoji--a {
  animation: bingo-emoji-bob 2.8s ease-in-out infinite;
}

.bingo-win__emoji--b {
  animation: bingo-emoji-bob 3.2s ease-in-out infinite 0.45s;
}

@keyframes bingo-emoji-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bingo-win__bg--animate,
  .bingo-win__bg2--animate,
  .bingo-win__emoji--a,
  .bingo-win__emoji--b {
    animation: none;
  }

  .bingo-win__bg {
    background-position: 50% 50%;
  }
}
</style>
