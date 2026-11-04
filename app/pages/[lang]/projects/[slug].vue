<script setup lang="ts">
import { findProject } from '~/data/projects'

const route = useRoute()
const { locale, localePath, t } = useLocale()
const project = computed(() => findProject(String(route.params.slug), locale.value))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: () => `${project.value?.title} — Noah Soler`,
  description: () => project.value?.summary,
})
</script>

<template>
  <article v-if="project" class="wrap page">
    <p class="back">
      <NuxtLink :to="localePath('/projects')">{{ t.projects.back }}</NuxtLink>
    </p>
    <h1>{{ project.title }}</h1>

    <dl class="facts">
      <div>
        <dt>{{ t.projects.context }}</dt>
        <dd>{{ project.context }}</dd>
      </div>
      <div v-if="project.period">
        <dt>{{ t.projects.when }}</dt>
        <dd>{{ project.period }}</dd>
      </div>
      <div>
        <dt>{{ t.projects.builtWith }}</dt>
        <dd>{{ project.stack.join(', ') }}</dd>
      </div>
      <div v-if="project.url">
        <dt>{{ t.projects.liveSite }}</dt>
        <dd><a :href="project.url" rel="noopener">{{ project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a></dd>
      </div>
    </dl>

    <div class="body">
      <p v-for="(paragraph, index) in project.body" :key="index">{{ paragraph }}</p>
    </div>

    <p v-if="project.links?.length" class="links">
      <a
        v-for="link in project.links"
        :key="link.href"
        :href="link.href"
        :aria-label="link.ariaLabel"
        target="_blank"
        rel="noopener noreferrer"
      >{{ link.label }}</a>
    </p>

    <figure v-if="project.embed" class="phone">
      <div class="phone-frame">
        <iframe
          :src="project.embed.src"
          :title="project.embed.title"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
      <figcaption>
        <a :href="project.embed.fullscreenHref" target="_blank" rel="noopener noreferrer">{{ project.embed.fullscreenLabel }}</a>
      </figcaption>
    </figure>
  </article>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

.back {
  margin-bottom: 24px;
  font-size: var(--step--1);
}

h1 {
  font-size: var(--step-4);
  max-width: 14ch;
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 20px 32px;
  margin: 40px 0;
  padding-block: 20px;
  border-block: 1px solid var(--contour);
}

dt {
  color: var(--ink-soft);
  font-size: var(--step--1);
}

dd {
  margin: 4px 0 0;
}

.body {
  display: grid;
  gap: 1em;
  font-size: var(--step-1);
  line-height: 1.5;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin-top: 32px;
  font-weight: 600;
}

.phone {
  display: grid;
  justify-items: center;
  gap: 16px;
  margin: 48px 0 0;
}

/* Phone proportions (9 / 19.5, about 390 x 844). The width also respects the
   viewport height so the frame never grows taller than the screen. */
.phone-frame {
  box-sizing: border-box;
  width: min(100%, 390px, calc(85dvh * 9 / 19.5));
  aspect-ratio: 9 / 19.5;
  overflow: hidden;
  border: 10px solid #111c23;
  border-radius: 44px;
  background: #111c23;
  box-shadow:
    0 0 0 1px var(--contour-strong),
    0 18px 40px -16px rgb(0 0 0 / 0.35);
}

.phone-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 34px;
  background: #0f0b1a;
}

.phone figcaption {
  font-size: var(--step--1);
}
</style>
