// https://nuxt.com/docs/api/configuration/nuxt-config
// Static hosting base path. Local dev: default `/`.
// GitHub Project Pages default URL needs `/repo-name/`; a custom domain on that repo is usually served at `/` — then set Actions variable NUXT_APP_BASE_URL=/ (see workflow).
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
