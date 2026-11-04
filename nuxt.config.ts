// https://nuxt.com/docs/api/configuration/nuxt-config
import { defaultLocale } from './app/i18n/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: defaultLocale },
      title: 'Noah Soler — Full-stack developer',
      meta: [
        { name: 'description', content: 'Full-stack developer and engineering apprentice. Vue, Nuxt, Symfony, Flutter. Looking for a 3–4 month fixed-term contract abroad, summer 2027.' },
        { name: 'theme-color', content: '#1b2a33' },
      ],
    },
  },
  nitro: {
    prerender: {
      // /bde/ is a static Angular site copied into public/bde, not a Nuxt page.
      // Without this the crawler follows the "open full screen" link and fails on a 404.
      ignore: ['/bde'],
    },
  },
  typescript: {
    strict: true,
  },
})
