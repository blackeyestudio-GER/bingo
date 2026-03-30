<script setup lang="ts">
const route = useRoute()
navigateTo({ path: '/play', query: { ...route.query } }, { replace: true })
</script>
<template>
  <p class="p-6 text-center text-sm text-dim-gray">Weiterleitung…</p>
</template>
