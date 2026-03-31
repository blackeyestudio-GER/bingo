// https://nuxt.com/docs/api/nuxt-config
// Subpath deploy (e.g. https://example.de/bingo/): build with NUXT_APP_BASE_URL=/bingo/
// (trailing slash). Default / matches a custom domain at the site root (GitHub Pages).
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'de' },
    },
  },
  nitro: { preset: 'static' },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
})
