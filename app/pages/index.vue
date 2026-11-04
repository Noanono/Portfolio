<script setup lang="ts">
import { getProjects } from '~/data/projects'

// The same page serves the English root and the French /fr.
definePageMeta({ alias: ['/fr'] })

const { locale, localePath, t } = useLocale()
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
        <p class="role">
          {{ t.home.role }}
        </p>
        <p class="search">
          {{ t.home.search }}
        </p>
        <p class="actions">
          <NuxtLink :to="localePath('/projects')">{{ t.home.seeProjects }}</NuxtLink>
          <a href="mailto:soler.noah@gmail.com">{{ t.home.emailMe }}</a>
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
  padding-block: 96px 64px;
  pointer-events: none; /* the map stays interactive under the text */
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

.role {
  margin-top: 28px;
  font-size: var(--step-1);
  line-height: 1.4;
  max-width: 34ch;
}

.search {
  margin-top: 16px;
  color: var(--ink-soft);
  max-width: 46ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin-top: 28px;
  font-weight: 600;
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
