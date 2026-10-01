<script setup lang="ts">
useSeoMeta({
  title: 'About — Noah Soler',
  description: 'Background, experience and languages of Noah Soler, full-stack developer and engineering apprentice.',
})

// Newest first.
const experience = [
  { period: 'Sep 2025 – present', role: 'Full-stack developer, apprenticeship', place: 'DOING, France' },
  { period: 'May – Jul 2025', role: 'Project intern', place: 'Safran Helicopter Engines, Bordes, France' },
  { period: 'Apr – Jun 2024', role: 'Project intern', place: 'Treasury General of the Kingdom, Rabat, Morocco' },
]

const languages = [
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'Fluent (B2+)' },
  { name: 'Spanish', level: 'Intermediate (A2–B1)' },
]
</script>

<template>
  <section class="wrap page">
    <h1>About</h1>

    <div class="intro">
      <p>
        I'm an engineering apprentice at Télécom Saint-Étienne, due to graduate in 2028.
        I spend most of my time as a full-stack developer at DOING, where I work on
        products for social enterprises and an EV-charging network.
      </p>
      <p>
        I've already worked abroad, in Rabat, and I want to keep growing in an
        international team. Outside work, I preside over my school's sports
        association, ski, snowboard and run.
      </p>
    </div>

    <h2>Experience</h2>
    <ol class="timeline">
      <li v-for="item in experience" :key="item.period">
        <span class="when">{{ item.period }}</span>
        <span class="what">{{ item.role }}</span>
        <span class="where">{{ item.place }}</span>
      </li>
    </ol>

    <h2>Languages</h2>
    <dl class="languages">
      <div v-for="language in languages" :key="language.name">
        <dt>{{ language.name }}</dt>
        <dd>{{ language.level }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

h1 {
  font-size: var(--step-4);
}

h2 {
  margin-top: 64px;
  margin-bottom: 20px;
  font-size: var(--step-2);
}

.intro {
  display: grid;
  gap: 1em;
  margin-top: 28px;
  font-size: var(--step-1);
  line-height: 1.5;
}

.timeline {
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 2px solid var(--contour-strong);
}

.timeline li {
  display: grid;
  gap: 2px;
  padding: 0 0 24px 20px;
  position: relative;
}

.timeline li::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 0.45em;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--contour-strong);
}

.timeline li:first-child::before {
  border-color: var(--piste);
  background: var(--piste);
}

.when,
.where {
  color: var(--ink-soft);
  font-size: var(--step--1);
}

.what {
  font-weight: 700;
}

.languages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 16px 32px;
  margin: 0;
}

dt {
  font-weight: 700;
}

dd {
  margin: 2px 0 0;
  color: var(--ink-soft);
}
</style>
