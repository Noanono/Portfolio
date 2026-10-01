<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <ul class="project-list">
    <li v-for="project in projects" :key="project.slug">
      <NuxtLink :to="`/projects/${project.slug}`" class="row">
        <h3>{{ project.title }}</h3>
        <p class="summary">{{ project.summary }}</p>
        <p class="meta">
          <span>{{ project.context }}</span>
          <span v-if="project.period">{{ project.period }}</span>
        </p>
        <ul class="stack" aria-label="Technologies">
          <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
        </ul>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.project-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--contour-strong);
}

.project-list > li {
  border-bottom: 1px solid var(--contour);
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  padding-block: 22px;
  text-decoration: none;
}

.row:hover h3 {
  color: var(--piste);
}

.summary {
  color: var(--ink);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0 12px;
  color: var(--ink-soft);
  font-size: var(--step--1);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  color: var(--ink-soft);
  font-size: var(--step--1);
  font-variation-settings: 'wdth' 75;
}

@media (min-width: 760px) {
  .row {
    grid-template-columns: 16rem minmax(0, 1fr) 13rem;
    column-gap: 32px;
    align-items: baseline;
  }

  .row h3 {
    grid-row: span 2;
  }

  .meta {
    grid-column: 3;
    grid-row: 1 / span 2;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
  }

  .stack {
    grid-column: 2;
  }
}
</style>
