<template>
  <div class="flex min-h-dvh flex-col">
    <div class="mx-2 my-2 flex flex-1 flex-col max-w-screen-2xl lg:mx-auto lg:w-full">
      <AppHeader />
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} — Streamer Bingo` : 'Streamer Bingo — Karte bauen',
})
</script>
