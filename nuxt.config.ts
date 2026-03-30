// https://nuxt.com/docs/api/configuration/nuxt-config
// GitHub project pages need base URL `/repo-name/`. Set NUXT_APP_BASE_URL in CI (see .github/workflows/nuxtjs.yml).
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'de' },
    },
  },
  nitro: { preset: 'static' },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
})
