// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Noah Soler — Full-stack developer',
      meta: [
        { name: 'description', content: 'Full-stack developer and engineering apprentice. Vue, Nuxt, Symfony, Flutter. Looking for a 3–4 month internship abroad, summer 2027.' },
        { name: 'theme-color', content: '#1b2a33' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap' },
      ],
    },
  },
  typescript: {
    strict: true,
  },
})
