<script setup lang="ts">
definePageMeta({ alias: ['/fr/about'] })

const { t } = useLocale()
const about = computed(() => t.value.about)

useSeoMeta({
  title: () => about.value.title,
  description: () => about.value.description,
})
</script>

<template>
  <section class="wrap page">
    <h1>{{ about.heading }}</h1>

    <div class="intro">
      <p v-for="(paragraph, index) in about.intro" :key="index">
        {{ paragraph }}
      </p>
    </div>

    <div class="paths">
      <section aria-labelledby="experience-title">
        <h2 id="experience-title">{{ about.experienceHeading }}</h2>
        <ol class="timeline">
          <li v-for="item in about.experience" :key="item.period">
            <span class="when">{{ item.period }}</span>
            <span class="what">{{ item.title }}</span>
            <span class="where">{{ item.place }}</span>
            <span v-if="item.detail" class="where">{{ item.detail }}</span>
          </li>
        </ol>
      </section>

      <section aria-labelledby="education-title">
        <h2 id="education-title">{{ about.educationHeading }}</h2>
        <ol class="timeline">
          <li v-for="item in about.education" :key="item.period">
            <span class="when">{{ item.period }}</span>
            <span class="what">{{ item.title }}</span>
            <span class="where">{{ item.place }}</span>
            <span v-if="item.detail" class="where">{{ item.detail }}</span>
          </li>
        </ol>
      </section>
    </div>

    <h2>{{ about.skillsHeading }}</h2>
    <dl class="languages">
      <div v-for="skill in about.skills" :key="skill.name">
        <dt>{{ skill.name }}</dt>
        <dd>{{ skill.items }}</dd>
      </div>
    </dl>

    <h2>{{ about.languagesHeading }}</h2>
    <dl class="languages">
      <div v-for="language in about.languages" :key="language.name">
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

.paths {
  display: grid;
  gap: 0 56px;
}

@media (min-width: 760px) {
  .paths {
    grid-template-columns: 1fr 1fr;
  }
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
