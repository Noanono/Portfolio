<script setup lang="ts">
import { absoluteUrl, localizedPath, locales } from '~/i18n/locale'

const route = useRoute()
const { locale, altLocale, altPath, localePath, t } = useLocale()

// Tell the browser and search engines which language the page is in, and where
// the same page exists in the other language.
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    ...locales.map(code => ({
      rel: 'alternate' as const,
      hreflang: code,
      href: absoluteUrl(localizedPath(route.path, code)),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(localizedPath(route.path, 'en')) },
  ],
}))
</script>

<template>
  <div class="layout">
    <a class="skip" href="#main">{{ t.site.skip }}</a>
    <header class="site-header wrap">
      <NuxtLink :to="localePath('/')" class="mark">Noah Soler</NuxtLink>
      <nav :aria-label="t.site.navLabel">
        <NuxtLink :to="localePath('/projects')">{{ t.site.projects }}</NuxtLink>
        <NuxtLink :to="localePath('/about')">{{ t.site.about }}</NuxtLink>
        <a href="mailto:soler.noah@gmail.com">{{ t.site.contact }}</a>
        <!--
          `external` makes this a plain link (full page load). The two languages
          are aliases of the same route, and vue-router ignores a navigation
          between aliases of the same route as "already there".
        -->
        <NuxtLink
          :to="altPath"
          external
          class="lang"
          :lang="altLocale"
          :hreflang="altLocale"
          :aria-label="t.site.switchLabel"
        >{{ altLocale.toUpperCase() }}</NuxtLink>
      </nav>
    </header>

    <main id="main">
      <slot />
    </main>

    <footer class="wrap">
      <div class="site-footer">
        <p>{{ t.site.footer }}</p>
        <ul>
          <li><a href="mailto:soler.noah@gmail.com">soler.noah@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/noah-soler-pro-fr" rel="me">LinkedIn</a></li>
          <li><a href="https://github.com/Noanono" rel="me">GitHub</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.skip {
  position: absolute;
  left: -999px;
}

.skip:focus {
  left: var(--gutter);
  top: 8px;
  z-index: 10;
  background: var(--paper);
  padding: 8px 12px;
}

.site-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  padding-block: 20px;
  position: relative;
  z-index: 2;
}

.mark {
  font-weight: 800;
  font-variation-settings: 'wdth' 125;
  text-decoration: none;
}

nav {
  display: flex;
  gap: clamp(14px, 3vw, 28px);
}

nav a {
  text-decoration: none;
  color: var(--ink-soft);
}

nav .lang {
  font-weight: 700;
  letter-spacing: 0.04em;
}

nav a:hover,
nav a.router-link-active {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--piste);
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 32px;
  padding-block: 40px;
  margin-top: 96px;
  border-top: 1px solid var(--contour);
  color: var(--ink-soft);
  font-size: var(--step--1);
}

.site-footer ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
