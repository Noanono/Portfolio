<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Projects — Noah Soler',
  description: 'Professional, client and school projects by Noah Soler.',
})
</script>

<template>
  <section class="wrap page">
    <h1>Projects</h1>
    <p class="lead">
      Work from my apprenticeship at DOING, client projects with the INSPIRE junior
      enterprise, and school projects at Télécom Saint-Étienne.
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
