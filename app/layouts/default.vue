<script setup lang="ts">
import { absoluteUrl, localizedPath, locales } from '~/i18n/locale'

const route = useRoute()
const { locale, altLocale, altPath, localePath, cvHref, t } = useLocale()

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
          between aliases of the same route as "already there". Prefetching is
          off because Nuxt would try to load a payload from a full URL and log
          an error on every page.
        -->
        <NuxtLink
          :to="altPath"
          external
          :prefetch="false"
          class="lang"
          :lang="altLocale"
          :hreflang="altLocale"
        >
          <span class="lang-name">{{ t.site.switchName }}</span>
          <span class="lang-code" aria-hidden="true">{{ altLocale.toUpperCase() }}</span>
        </NuxtLink>
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
          <li><a :href="cvHref" download>{{ t.site.cv }}</a></li>
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
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 16px;
  padding-block: 20px;
  position: relative;
  z-index: 2;
}

.mark {
  white-space: nowrap;
  font-weight: 800;
  font-variation-settings: 'wdth' 125;
  text-decoration: none;
}

nav {
  display: flex;
  gap: clamp(12px, 3vw, 28px);
  white-space: nowrap;
}

nav a {
  text-decoration: none;
  color: var(--ink-soft);
}

/* A rule sets the language switch apart from the page links. */
nav .lang {
  padding-left: clamp(12px, 3vw, 28px);
  border-left: 1px solid var(--contour-strong);
}

/* On narrow screens the switch shows the language code; the full name stays
   available to screen readers. */
.lang-code {
  display: none;
}

@media (max-width: 480px) {
  nav {
    font-size: 0.9375rem;
  }

  .lang-name {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  .lang-code {
    display: inline;
    font-weight: 700;
  }
}

/* Very narrow phones: keep the name and the four nav items on one line. */
@media (max-width: 400px) {
  .mark {
    font-size: 0.9375rem;
  }

  nav {
    gap: 10px;
    font-size: 0.875rem;
  }

  nav .lang {
    padding-left: 10px;
  }
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
