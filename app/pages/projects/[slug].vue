<script setup lang="ts">
import { findProject } from '~/data/projects'

const route = useRoute()
const project = findProject(String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: `${project.title} — Noah Soler`,
  description: project.summary,
})
</script>

<template>
  <article v-if="project" class="wrap page">
    <p class="back">
      <NuxtLink to="/projects">All projects</NuxtLink>
    </p>
    <h1>{{ project.title }}</h1>

    <dl class="facts">
      <div>
        <dt>Context</dt>
        <dd>{{ project.context }}</dd>
      </div>
      <div v-if="project.period">
        <dt>When</dt>
        <dd>{{ project.period }}</dd>
      </div>
      <div>
        <dt>Built with</dt>
        <dd>{{ project.stack.join(', ') }}</dd>
      </div>
      <div v-if="project.url">
        <dt>Live site</dt>
        <dd><a :href="project.url" rel="noopener">{{ project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a></dd>
      </div>
    </dl>

    <div class="body">
      <p v-for="(paragraph, index) in project.body" :key="index">{{ paragraph }}</p>
    </div>
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
</style>
