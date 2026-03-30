<script setup lang="ts">
import { MODAL_HABIT_IDEAS } from '~/data/habitIdeas'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  add: [phrase: string]
}>()

const filterText = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) filterText.value = ''
  },
)

const filteredIdeas = computed(() => {
  const raw = filterText.value.trim().toLowerCase()
  if (!raw) return [...MODAL_HABIT_IDEAS]
  const tokens = raw.split(/\s+/).filter(Boolean)
  return MODAL_HABIT_IDEAS.filter((line) => {
    const l = line.toLowerCase()
    return tokens.every((t) => l.includes(t))
  })
})

function close() {
  emit('update:open', false)
}

function pick(phrase: string) {
  emit('add', phrase)
}

/** Nur Schließen-Button schließt — kein Klick außerhalb, kein ESC. */
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
      role="presentation"
      aria-hidden="false"
    >
      <div
        class="flex max-h-[min(85vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-eerie-black shadow-2xl ring-2 ring-amber-500/40"
        role="dialog"
        aria-modal="true"
        aria-labelledby="habits-modal-title"
        @click.stop
      >
        <div class="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
          <h2 id="habits-modal-title" class="text-base font-semibold text-white">
            Mehr Ideen
            <span class="text-dim-gray"
              >({{ filteredIdeas.length }}<template v-if="filterText.trim()"> / {{ MODAL_HABIT_IDEAS.length }}</template
              >)</span
            >
          </h2>
          <button
            type="button"
            class="shrink-0 rounded-lg border border-white/15 bg-night px-3 py-1.5 text-sm font-medium text-gray-200 hover:border-moonstone/50 hover:text-white"
            @click="close"
          >
            Schließen
          </button>
        </div>
        <p class="border-b border-white/5 px-4 py-2 text-xs text-dim-gray">
          Button klicken = Zeile in die Liste. Schließen nur über „Schließen“. Mehrere Wörter = alle müssen vorkommen.
        </p>
        <div class="border-b border-white/10 px-4 py-2">
          <label for="habits-filter" class="sr-only">Filtern</label>
          <input
            id="habits-filter"
            v-model="filterText"
            type="search"
            autocomplete="off"
            placeholder="Filtern …"
            class="w-full rounded-lg border border-white/15 bg-night px-3 py-2 text-sm text-gray-100 placeholder:text-dim-gray focus:border-moonstone/50 focus:outline-none focus:ring-1 focus:ring-moonstone/40"
          />
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto p-3">
          <p v-if="filteredIdeas.length === 0" class="py-6 text-center text-sm text-dim-gray">Nichts passt — Filter lockern.</p>
          <div v-else class="flex flex-wrap gap-1.5">
            <button
              v-for="(line, idx) in filteredIdeas"
              :key="`${idx}-${line}`"
              type="button"
              class="rounded-md border border-white/10 bg-night/90 px-2.5 py-1.5 text-left text-xs text-gray-200 hover:border-moonstone/45 hover:text-white"
              @click="pick(line)"
            >
              {{ line }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
