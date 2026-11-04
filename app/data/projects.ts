export interface Project {
  slug: string
  title: string
  /** One sentence, shown in the project list. */
  summary: string
  /** Where the project happened: employer, client or school. */
  context: string
  period?: string
  stack: string[]
  /** Longer description for the detail page, one paragraph per entry. */
  body: string[]
  url?: string
  /** Shown before other projects. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'e-totem',
    title: 'E-TOTEM charging map',
    summary: 'Locator map for an EV-charging network, now loading an area 8× faster.',
    context: 'DOING, apprenticeship',
    period: '2025 – present',
    stack: ['Flutter', 'SQL', 'easy2do'],
    body: [
      'E-TOTEM runs a network of electric-vehicle charging stations. Drivers use its map to find the nearest available station.',
      'I reworked how the map loads stations for a given area, dividing the loading time by eight. Most of the gain came from the database.',
      'I added an index on the slowest queries, and moved the heavy filters onto joins with buffer tables that cron jobs keep up to date, so a request no longer recomputes everything.',
      'I also replaced the native SQL pagination, which slows down on large result sets, with pagination driven by an index.',
    ],
    featured: true,
  },
  {
    slug: 'amagis',
    title: 'AMAGiS',
    summary: 'Management software for work-integration social enterprises.',
    context: 'DOING, apprenticeship',
    period: '2025 – present',
    stack: ['Vue', 'TypeScript', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
    body: [
      'AMAGiS helps work-integration social enterprises (SIAE) run their day-to-day operations. Version 2 is a rewrite of an application originally built in VB6, and I work on both the Vue front end and the Symfony back end.',
      'I built the invoicing system and a feature to compare evaluations over time, and redesigned the list components used across the whole app.',
      'On the DevOps side, I fixed the Bitbucket CI/CD pipeline and upgraded the Docker environment and its dependencies.',
    ],
    featured: true,
  },
  {
    slug: 'line-following-car',
    title: 'Line-following car',
    summary: 'Embedded car that follows a black line on the floor, with its own motor control board.',
    context: 'Télécom Saint-Étienne',
    stack: ['Arduino', 'PCB design', 'Sensors'],
    body: [
      'A school project: a car that follows a black line drawn on the ground. I designed the motor control board, from the PCB layout to fabricating the board by printing its circuits.',
      'I assembled it with an Arduino board, colour sensors that detect the change between floor and line, and an ultrasonic sensor. I also developed an algorithm to make the line following more efficient.',
    ],
    featured: true,
  },
  {
    slug: 'portfolio-site',
    title: 'This portfolio',
    summary: 'Static Nuxt site with an interactive topographic map, deployed through a protected CI/CD pipeline.',
    context: 'Personal project',
    period: 'Oct 2026 – present',
    stack: ['Nuxt 4', 'TypeScript', 'GitHub Actions', 'Cloudflare'],
    body: [
      'The site you are reading. The home page draws contour lines on a canvas with a small marching-squares tracer, and one of them follows the pointer.',
      'Every change goes through a pull request. The pipeline runs lint, type-check, a dependency audit and a static build, then deploys to a staging site on `develop` and to production on `main`. Security audit exemptions are listed with a reason each.',
      'The branching rules, protection rules and deployment steps are documented in the repository.',
    ],
    url: 'https://github.com/Noanono/Portfolio',
    featured: true,
  },
  {
    slug: 'camp-boat',
    title: 'Camp-Boat',
    summary: 'Website presenting an inventor\'s caravan-boat concept.',
    context: 'INSPIRE Junior Enterprise, client project',
    stack: ['WordPress'],
    body: [
      'A client project delivered through INSPIRE, the junior enterprise of Télécom Saint-Étienne. The client, a private inventor, needed a site presenting his caravan-boat concept.',
      'I was the developer on the project. I added features such as the menu banner and extra pages, and wrote a user guide so the client can edit the site without help.',
    ],
    url: 'https://camp-boat.fr/',
  },
  {
    slug: '3d-portfolio',
    title: 'Interactive 3D portfolio',
    summary: 'A 3D portfolio website built for another person.',
    context: 'Built for a third party',
    stack: ['Nuxt', 'TresJS', 'Three.js'],
    body: [
      'An interactive 3D portfolio built for someone else with Nuxt and TresJS. It is not publicly available.',
    ],
  },
  {
    slug: 'connected-dartboard',
    title: 'Connected dartboard',
    summary: 'Planned: turn an electronic dartboard into a connected one that sends scores to a phone.',
    context: 'Personal project, design stage',
    stack: ['ESP32', 'Bluetooth LE', 'Mobile app'],
    body: [
      'Status: planned. So far only the design thinking is done, nothing is built yet.',
      'The idea is to make a store-bought electronic dartboard connected, so scores reach a phone and games can be started from it. To leave the board untouched, the plan is to unplug the ribbon cables of its membrane and connect them to an ESP32 module, which can be reversed at any time.',
    ],
  },
  {
    slug: 'sand-simulation',
    title: 'Sand gravity simulation',
    summary: 'Physics simulation of falling sand particles.',
    context: 'Télécom Saint-Étienne',
    period: 'Jan – May 2025',
    stack: ['C#', 'SFML'],
    body: [
      'A school project simulating how grains of sand fall and pile up, rendered with SFML.',
    ],
  },
  {
    slug: 'bde-website',
    title: 'Student union campaign site',
    summary: 'Showcase web app for a student union campaign.',
    context: 'Télécom Saint-Étienne',
    period: 'Dec 2024 – Feb 2025',
    stack: ['Angular', 'TypeScript'],
    body: [
      'A showcase site for the BA\'TSE student union list during the selection week for the following year\'s union.',
    ],
  },
]

export function findProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}
