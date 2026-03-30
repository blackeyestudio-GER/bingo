<script setup lang="ts">
import type { GridSize } from '~/utils/bingoPayload'

const props = defineProps<{
  size: GridSize
  cells: string[]
  marked: Set<number>
  readonly?: boolean
}>()

const emit = defineEmits<{
  toggle: [index: number]
}>()

const colsClass = computed(() => (props.size === 3 ? 'grid-cols-3' : 'grid-cols-5'))
</script>

<template>
  <div
    class="w-full max-w-2xl rounded-xl border border-white/10 bg-gradient-to-b from-eerie-black to-night p-3 shadow-2xl ring-4 ring-moonstone/30 ring-offset-4 ring-offset-night sm:p-4 print:max-w-[18cm] print:border-2 print:border-neutral-800 print:bg-white print:shadow-none print:ring-0 print:ring-offset-0"
    role="region"
    :aria-label="`Bingo-Raster ${size} mal ${size}`"
  >
    <div class="grid gap-2" :class="colsClass">
      <button
        v-for="(text, i) in cells"
        :key="i"
        type="button"
        class="flex min-h-[4.5rem] items-center justify-center rounded-lg border px-2 py-2 text-center text-xs font-semibold leading-snug text-gray-100 transition sm:min-h-[5rem] sm:text-sm print:min-h-0 print:border print:border-neutral-700 print:bg-white print:text-neutral-900"
        :class="[
          marked.has(i)
            ? 'border-moonstone/70 bg-moonstone/20 line-through decoration-2 print:bg-neutral-100'
            : 'border-white/10 bg-night/90 hover:border-moonstone/50 print:border-neutral-300',
          readonly && 'pointer-events-none cursor-default opacity-90',
        ]"
        :disabled="readonly"
        :aria-pressed="marked.has(i)"
        @click="emit('toggle', i)"
      >
        {{ text || '—' }}
      </button>
    </div>
  </div>
</template>
