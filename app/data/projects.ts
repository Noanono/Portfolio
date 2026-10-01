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
    stack: ['Flutter', 'easy2do'],
    body: [
      'E-TOTEM runs a network of electric-vehicle charging stations. Drivers use its map to find the nearest available station.',
      'I reworked how the map loads stations for a given area, dividing the loading time by eight.',
    ],
    featured: true,
  },
  {
    slug: 'amagis',
    title: 'AMAGiS',
    summary: 'Management software for work-integration social enterprises.',
    context: 'DOING, apprenticeship',
    period: '2025 – present',
    stack: ['Vue', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
    body: [
      'AMAGiS helps work-integration social enterprises (SIAE) run their day-to-day operations.',
      'I built the invoicing system and a feature to compare evaluations over time, and redesigned the list components used across the whole app.',
      'On the DevOps side, I fixed the Bitbucket CI/CD pipeline and upgraded the Docker environment and its dependencies.',
    ],
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
      'I was the developer on the project.',
    ],
    url: 'https://camp-boat.fr/',
    featured: true,
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
