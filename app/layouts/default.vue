<template>
  <div class="layout">
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header wrap">
      <NuxtLink to="/" class="mark">Noah Soler</NuxtLink>
      <nav aria-label="Main">
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <a href="mailto:soler.noah@gmail.com">Contact</a>
      </nav>
    </header>

    <main id="main">
      <slot />
    </main>

    <footer class="wrap">
      <div class="site-footer">
        <p>Saint-Étienne, France. Open to internships abroad from summer 2027.</p>
        <ul>
          <li><a href="mailto:soler.noah@gmail.com">soler.noah@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/noah-soler-9b0471267" rel="me">LinkedIn</a></li>
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
  justify-content: space-between;
  gap: 24px;
  padding-block: 20px;
  position: relative;
  z-index: 2;
}

.mark {
  font-weight: 800;
  font-variation-settings: 'wdth' 125;
  text-decoration: none;
}

nav {
  display: flex;
  gap: clamp(14px, 3vw, 28px);
}

nav a {
  text-decoration: none;
  color: var(--ink-soft);
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
