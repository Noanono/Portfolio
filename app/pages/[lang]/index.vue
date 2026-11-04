<script setup lang="ts">
import { getProjects } from '~/data/projects'

const { locale, localePath, cvHref, t } = useLocale()
const featured = computed(() => getProjects(locale.value).filter(project => project.featured))

useSeoMeta({
  title: () => t.value.home.title,
  description: () => t.value.home.description,
})
</script>

<template>
  <div>
    <section class="hero">
      <ContourMap class="hero-map" />
      <div class="hero-text wrap">
        <h1>Noah Soler</h1>
        <p class="availability">
          <span class="dot" aria-hidden="true" />
          {{ t.home.availability }}
        </p>
        <p class="role">
          {{ t.home.role }}
        </p>
        <p class="search">
          {{ t.home.search }}
        </p>
        <p class="actions">
          <a class="button" href="mailto:soler.noah@gmail.com">{{ t.home.emailMe }}</a>
          <a class="button secondary" :href="cvHref" download>{{ t.home.downloadCv }}</a>
          <NuxtLink :to="localePath('/projects')">{{ t.home.seeProjects }}</NuxtLink>
        </p>
      </div>
    </section>

    <section class="wrap selected" aria-labelledby="selected-title">
      <h2 id="selected-title">{{ t.home.selected }}</h2>
      <ProjectList :projects="featured" />
      <p class="more">
        <NuxtLink :to="localePath('/projects')">{{ t.home.allProjects }}</NuxtLink>
      </p>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: clip; /* the text backdrop extends past the column */
  min-height: min(86dvh, 820px);
  display: flex;
  align-items: flex-end;
  margin-top: -64px; /* let the map run under the header */
}

.hero-map {
  position: absolute;
  inset: 0;
  /* fade the map out before the next section instead of cutting it */
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
}

.hero-text {
  position: relative;
  isolation: isolate;
  padding-block: 96px 64px;
  pointer-events: none; /* the map stays interactive under the text */
}

/* Soften the contour lines behind the text so it stays easy to read, while the
   map stays fully visible on the right. */
.hero-text::before {
  content: '';
  position: absolute;
  inset: 0 -24px;
  z-index: -1;
  background: radial-gradient(
    ellipse 640px 75% at 260px 58%,
    color-mix(in srgb, var(--paper) 94%, transparent) 45%,
    transparent 100%
  );
}

.hero-text a {
  pointer-events: auto;
}

h1 {
  font-size: var(--step-4);
  line-height: 0.92;
  letter-spacing: -0.02em;
  max-width: 9ch;
}

.availability {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  font-size: var(--step-1);
  font-weight: 700;
  font-variation-settings: 'wdth' 110;
  line-height: 1.25;
}

/* Same red dot as "current" in the About timeline. */
.dot {
  flex: none;
  width: 11px;
  height: 11px;
  margin-top: 0.4em; /* lines up with the first line of text */
  border-radius: 50%;
  background: var(--piste);
}

.role {
  margin-top: 20px;
  font-size: var(--step-1);
  line-height: 1.4;
  max-width: 34ch;
}

.search {
  margin-top: 12px;
  color: var(--ink-soft);
  max-width: 46ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  max-width: none;
  margin-top: 28px;
  font-weight: 600;
}

.button {
  padding: 11px 20px;
  border: 2px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  text-decoration: none;
}

.button.secondary {
  background: transparent;
  color: var(--ink);
}

.button:hover,
.button:focus-visible {
  border-color: var(--piste);
  background: var(--piste);
  color: var(--paper);
}

.button.secondary:hover,
.button.secondary:focus-visible {
  background: transparent;
  color: var(--piste);
}


.selected {
  margin-top: 48px;
}

.selected h2 {
  margin-bottom: 24px;
}

.more {
  margin-top: 20px;
}
</style>
