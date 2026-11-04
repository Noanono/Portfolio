<script setup lang="ts">
import { defaultLocale, locales, pickLocale } from '~/i18n'
import { localizedPath } from '~/i18n/url'

// The root of the site has no content of its own. Visitors are sent to their
// language; the links below are for browsers without JavaScript and for crawlers.
// It is kept out of search results so that only the language versions, which
// carry the hreflang tags, are indexed.
definePageMeta({ layout: false })

useHead({ htmlAttrs: { lang: defaultLocale } })
useSeoMeta({ title: 'Noah Soler', robots: 'noindex, follow' })

const choices = locales.map(locale => ({
  code: locale.code,
  name: locale.name,
  path: `${localizedPath('/', locale.code)}/`,
}))

onMounted(() => {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  window.location.replace(`${localizedPath('/', pickLocale(preferred).code)}/`)
})
</script>

<template>
  <main class="gateway wrap">
    <h1>Noah Soler</h1>
    <ul>
      <li v-for="choice in choices" :key="choice.code">
        <NuxtLink :to="choice.path" :lang="choice.code" :hreflang="choice.code">{{ choice.name }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.gateway {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

h1 {
  font-size: var(--step-4);
  line-height: 0.92;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--step-2);
  font-weight: 600;
}
</style>
