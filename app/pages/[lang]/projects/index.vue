<script setup lang="ts">
import { getProjects } from '~/data/projects'

const { locale, t } = useLocale()
const projects = computed(() => getProjects(locale.value))

useSeoMeta({
  title: () => t.value.projects.title,
  description: () => t.value.projects.description,
})
</script>

<template>
  <section class="wrap page">
    <h1>{{ t.projects.heading }}</h1>
    <p class="lead">
      {{ t.projects.lead }}
    </p>
    <ProjectList :projects="projects" />
  </section>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

h1 {
  font-size: var(--step-4);
}

.lead {
  margin-block: 20px 40px;
  color: var(--ink-soft);
}
</style>
