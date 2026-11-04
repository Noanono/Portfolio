<script setup lang="ts">
import { defaultLocale, locales } from '~/i18n'
import { absoluteUrl, localizedPath } from '~/i18n/url'

const { locale, neutralPath, others, localePath, cvHref, t } = useLocale()

// What search engines need to know about each page: its language, its own
// address (canonical), and the same page in every language, itself included.
// `x-default` is the page for visitors whose language is not available.
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'canonical', href: absoluteUrl(localizedPath(neutralPath.value, locale.value)) },
    ...locales.map(language => ({
      rel: 'alternate' as const,
      hreflang: language.code,
      href: absoluteUrl(localizedPath(neutralPath.value, language.code)),
    })),
    {
      rel: 'alternate' as const,
      hreflang: 'x-default',
      href: absoluteUrl(localizedPath(neutralPath.value, defaultLocale)),
    },
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
        <div class="languages" role="group" :aria-label="t.site.languageLabel">
          <NuxtLink
            v-for="language in others"
            :key="language.code"
            :to="language.path"
            class="lang"
            :lang="language.code"
            :hreflang="language.code"
          >
            <span class="lang-name">{{ language.name }}</span>
            <span class="lang-code" aria-hidden="true">{{ language.short }}</span>
          </NuxtLink>
        </div>
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
.languages {
  display: flex;
  gap: clamp(12px, 3vw, 28px);
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

  .languages {
    gap: 10px;
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
