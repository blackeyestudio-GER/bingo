<script setup lang="ts">
useShareCopyPointerTracking()

const active = useState('bingo-share-copy-toast-active', () => false)
const nonce = useState('bingo-share-copy-toast-nonce', () => 0)
const anchor = useState('bingo-share-copy-toast-anchor', () => ({ x: 0, y: 0 }))

const toastWrapStyle = computed(() => {
  if (!import.meta.client) return {}
  const pad = 16
  const vw = window.innerWidth
  const vh = window.innerHeight
  const x = Math.min(Math.max(anchor.value.x, pad), vw - pad)
  const y = Math.min(Math.max(anchor.value.y, pad), vh - pad)
  const roomAbove = y > 52
  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: roomAbove ? 'translate(-50%, calc(-100% - 12px))' : 'translate(-50%, 16px)',
  } as Record<string, string>
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="active"
      class="share-copy-toast-wrap pointer-events-none fixed z-[110]"
      :style="toastWrapStyle"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span :key="nonce" class="share-copy-toast">kopiert</span>
    </div>
  </Teleport>
</template>

<style scoped>
.share-copy-toast-wrap {
  transform-origin: center bottom;
}

.share-copy-toast {
  @apply rounded-lg border border-white/15 bg-night/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-moonstone shadow-lg shadow-black/40 ring-1 ring-moonstone/20;
  animation: share-copy-toast 2s ease-out forwards;
}

@keyframes share-copy-toast {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.94);
  }
  14% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  40% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .share-copy-toast {
    animation: share-copy-toast-reduced 1.6s ease-out forwards;
  }

  @keyframes share-copy-toast-reduced {
    0%,
    55% {
      opacity: 1;
      transform: none;
    }
    100% {
      opacity: 0;
      transform: none;
    }
  }
}
</style>
