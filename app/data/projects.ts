import type { Locale } from '~/i18n/locale'

export interface ProjectLink {
  href: string
  /** Visible text of the link. */
  label: string
  /** Spoken label when the visible text alone is not enough. Must start with the visible text. */
  ariaLabel?: string
}

/** A site shown in a phone-shaped frame on the project page. */
export interface ProjectEmbed {
  /** Path of the site served by this portfolio, e.g. `/bde/index.html`. */
  src: string
  /** Accessible title of the frame. */
  title: string
  /** Where "open full screen" leads. */
  fullscreenHref: string
  fullscreenLabel: string
}

/** A project in one language, as the pages use it. */
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
  /** External links opened in a new tab, shown under the description. */
  links?: ProjectLink[]
  embed?: ProjectEmbed
  /** Shown before other projects. */
  featured?: boolean
}

/** A text written once per language. TypeScript fails the build if one is missing. */
type Localized<T> = Record<Locale, T>

interface ProjectSource {
  slug: string
  title: Localized<string>
  summary: Localized<string>
  context: Localized<string>
  period?: Localized<string>
  stack: Localized<string[]>
  body: Localized<string[]>
  url?: string
  links?: { href: string, label: Localized<string>, ariaLabel?: Localized<string> }[]
  embed?: {
    src: string
    title: Localized<string>
    fullscreenHref: string
    fullscreenLabel: Localized<string>
  }
  featured?: boolean
}

const sources: ProjectSource[] = [
  {
    slug: 'e-totem',
    title: { en: 'E-TOTEM charging map', fr: 'Carte de recharge E-TOTEM' },
    summary: {
      en: 'Locator map for an EV-charging network, now loading an area 8× faster.',
      fr: 'Carte de localisation d\'un réseau de recharge de véhicules électriques, qui charge désormais une zone 8 fois plus vite.',
    },
    context: { en: 'DOING, apprenticeship', fr: 'DOING, alternance' },
    period: { en: '2025 – present', fr: '2025 – aujourd\'hui' },
    stack: { en: ['Flutter', 'SQL', 'easy2do'], fr: ['Flutter', 'SQL', 'easy2do'] },
    body: {
      en: [
        'E-TOTEM runs a network of electric-vehicle charging stations. Drivers use its map to find the nearest available station.',
        'I reworked how the map loads stations for a given area, dividing the loading time by eight. Most of the gain came from the database.',
        'I added an index on the slowest queries, and moved the heavy filters onto joins with buffer tables that cron jobs keep up to date, so a request no longer recomputes everything.',
        'I also replaced the native SQL pagination, which slows down on large result sets, with pagination driven by an index.',
      ],
      fr: [
        'E-TOTEM exploite un réseau de bornes de recharge pour véhicules électriques. Les conducteurs utilisent sa carte pour trouver la borne disponible la plus proche.',
        'J\'ai revu la façon dont la carte charge les bornes d\'une zone donnée, ce qui a divisé le temps de chargement par huit. L\'essentiel du gain vient de la base de données.',
        'J\'ai ajouté un index sur les requêtes les plus lentes et déplacé les filtres coûteux vers des jointures sur des tables tampons que des crons maintiennent à jour, si bien qu\'une requête ne recalcule plus tout.',
        'J\'ai aussi remplacé la pagination SQL native, qui ralentit sur les gros jeux de résultats, par une pagination pilotée par un index.',
      ],
    },
    links: [
      {
        href: 'https://www.e-totem.fr/#/home/ou_se_recharger',
        label: { en: 'Visit the E-TOTEM website', fr: 'Voir le site E-TOTEM' },
        ariaLabel: {
          en: 'Visit the E-TOTEM website (opens in a new tab)',
          fr: 'Voir le site E-TOTEM (s\'ouvre dans un nouvel onglet)',
        },
      },
    ],
    featured: true,
  },
  {
    slug: 'amagis',
    title: { en: 'AMAGiS', fr: 'AMAGiS' },
    summary: {
      en: 'Management software for work-integration social enterprises.',
      fr: 'Logiciel de gestion pour les structures d\'insertion par l\'activité économique.',
    },
    context: { en: 'DOING, apprenticeship', fr: 'DOING, alternance' },
    period: { en: '2025 – present', fr: '2025 – aujourd\'hui' },
    stack: {
      en: ['Vue', 'TypeScript', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
      fr: ['Vue', 'TypeScript', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
    },
    body: {
      en: [
        'AMAGiS helps work-integration social enterprises (SIAE) run their day-to-day operations. Version 2 is a rewrite of an application originally built in VB6, and I work on both the Vue front end and the Symfony back end.',
        'I built the invoicing system and a feature to compare evaluations over time, and redesigned the list components used across the whole app.',
        'On the DevOps side, I fixed the Bitbucket CI/CD pipeline and upgraded the Docker environment and its dependencies.',
      ],
      fr: [
        'AMAGiS aide les structures d\'insertion par l\'activité économique (SIAE) à gérer leur activité au quotidien. La version 2 est une refonte d\'une application développée à l\'origine en VB6 ; je travaille à la fois sur le front Vue et sur le back Symfony.',
        'J\'ai développé le système de facturation et une fonctionnalité de comparaison des évaluations dans le temps, et j\'ai repensé les composants de liste utilisés dans toute l\'application.',
        'Côté DevOps, j\'ai corrigé le pipeline CI/CD Bitbucket et mis à jour l\'environnement Docker et ses dépendances.',
      ],
    },
    links: [
      {
        href: 'https://www.amagis.fr/',
        label: { en: 'Visit the AMAGiS website', fr: 'Voir le site AMAGiS' },
        ariaLabel: {
          en: 'Visit the AMAGiS website (opens in a new tab)',
          fr: 'Voir le site AMAGiS (s\'ouvre dans un nouvel onglet)',
        },
      },
    ],
    featured: true,
  },
  {
    slug: 'line-following-car',
    title: { en: 'Line-following car', fr: 'Voiture suiveuse de ligne' },
    summary: {
      en: 'Embedded car that follows a black line on the floor, with its own motor control board.',
      fr: 'Voiture embarquée qui suit une ligne noire au sol, avec sa propre carte de contrôle des moteurs.',
    },
    context: { en: 'Télécom Saint-Étienne', fr: 'Télécom Saint-Étienne' },
    stack: {
      en: ['Arduino', 'PCB design', 'Sensors'],
      fr: ['Arduino', 'Conception de PCB', 'Capteurs'],
    },
    body: {
      en: [
        'A school project: a car that follows a black line drawn on the ground. I designed the motor control board, from the PCB layout to fabricating the board by printing its circuits.',
        'I assembled it with an Arduino board, colour sensors that detect the change between floor and line, and an ultrasonic sensor. I also developed an algorithm to make the line following more efficient.',
      ],
      fr: [
        'Un projet d\'école : une voiture qui suit une ligne noire tracée au sol. J\'ai conçu la carte de contrôle des moteurs, de la conception du PCB à la fabrication de la carte par impression des circuits.',
        'Je l\'ai assemblée avec une carte Arduino, des capteurs de couleur qui détectent le passage entre le sol et la ligne, et un capteur à ultrasons. J\'ai aussi développé un algorithme pour rendre le suivi de ligne plus efficace.',
      ],
    },
    featured: true,
  },
  {
    slug: 'portfolio-site',
    title: { en: 'This portfolio', fr: 'Ce portfolio' },
    summary: {
      en: 'Static Nuxt site with an interactive topographic map, deployed through a protected CI/CD pipeline.',
      fr: 'Site Nuxt statique avec une carte topographique interactive, déployé par un pipeline CI/CD protégé.',
    },
    context: { en: 'Personal project', fr: 'Projet personnel' },
    period: { en: 'Oct 2026 – present', fr: 'oct. 2026 – aujourd\'hui' },
    stack: {
      en: ['Nuxt 4', 'TypeScript', 'GitHub Actions', 'Cloudflare'],
      fr: ['Nuxt 4', 'TypeScript', 'GitHub Actions', 'Cloudflare'],
    },
    body: {
      en: [
        'The site you are reading, in English and French. The home page draws contour lines on a canvas with a small marching-squares tracer, and one of them follows the pointer.',
        'Every change goes through a pull request. The pipeline runs lint, type-check, a dependency audit and a static build, then deploys to a staging site on `develop` and to production on `main`. The audit blocks the build on high or critical advisories, and any exemption has to be listed with a reason.',
        'The branching rules, protection rules and deployment steps are documented in the repository.',
      ],
      fr: [
        'Le site que vous lisez, en anglais et en français. La page d\'accueil dessine des courbes de niveau sur un canvas avec un petit traceur marching squares, et l\'une d\'elles suit le pointeur.',
        'Chaque changement passe par une pull request. Le pipeline lance le lint, la vérification des types, un audit des dépendances et un build statique, puis déploie sur un site de staging depuis `develop` et en production depuis `main`. L\'audit bloque le build en cas d\'avis élevé ou critique, et toute exemption doit être listée avec sa raison.',
        'Les règles de branches, de protection et les étapes de déploiement sont documentées dans le dépôt.',
      ],
    },
    url: 'https://github.com/Noanono/Portfolio',
    featured: true,
  },
  {
    slug: 'camp-boat',
    title: { en: 'Camp-Boat', fr: 'Camp-Boat' },
    summary: {
      en: 'Website presenting an inventor\'s caravan-boat concept.',
      fr: 'Site présentant le concept de caravane-bateau d\'un inventeur.',
    },
    context: {
      en: 'INSPIRE Junior Enterprise, client project',
      fr: 'Junior-entreprise INSPIRE, projet client',
    },
    stack: { en: ['WordPress'], fr: ['WordPress'] },
    body: {
      en: [
        'A client project delivered through INSPIRE, the junior enterprise of Télécom Saint-Étienne. The client, a private inventor, needed a site presenting his caravan-boat concept.',
        'I was the developer on the project. I added features such as the menu banner and extra pages, and wrote a user guide so the client can edit the site without help.',
      ],
      fr: [
        'Un projet client réalisé via INSPIRE, la junior-entreprise de Télécom Saint-Étienne. Le client, un inventeur particulier, avait besoin d\'un site présentant son concept de caravane-bateau.',
        'J\'étais le développeur du projet. J\'ai ajouté des fonctionnalités comme le bandeau de menu et des pages supplémentaires, et rédigé une notice d\'utilisation pour que le client puisse modifier le site sans aide.',
      ],
    },
    url: 'https://camp-boat.fr/',
  },
  {
    slug: '3d-portfolio',
    title: { en: 'Interactive 3D portfolio', fr: 'Portfolio 3D interactif' },
    summary: {
      en: 'A 3D portfolio website built for another person.',
      fr: 'Un site portfolio 3D réalisé pour une autre personne.',
    },
    context: { en: 'Built for a third party', fr: 'Réalisé pour un tiers' },
    stack: { en: ['Nuxt', 'TresJS', 'Three.js'], fr: ['Nuxt', 'TresJS', 'Three.js'] },
    body: {
      en: [
        'An interactive 3D portfolio built for someone else with Nuxt and TresJS. It is not publicly available.',
      ],
      fr: [
        'Un portfolio 3D interactif réalisé pour quelqu\'un d\'autre avec Nuxt et TresJS. Il n\'est pas accessible publiquement.',
      ],
    },
  },
  {
    slug: 'connected-dartboard',
    title: { en: 'Connected dartboard', fr: 'Cible de fléchettes connectée' },
    summary: {
      en: 'Planned: turn an electronic dartboard into a connected one that sends scores to a phone.',
      fr: 'Prévu : rendre connectée une cible de fléchettes électronique pour envoyer les scores sur un téléphone.',
    },
    context: {
      en: 'Personal project, design stage',
      fr: 'Projet personnel, phase de conception',
    },
    stack: {
      en: ['ESP32', 'Bluetooth LE', 'Mobile app'],
      fr: ['ESP32', 'Bluetooth LE', 'App mobile'],
    },
    body: {
      en: [
        'Status: planned. So far only the design thinking is done, nothing is built yet.',
        'The idea is to make a store-bought electronic dartboard connected, so scores reach a phone and games can be started from it. To leave the board untouched, the plan is to unplug the ribbon cables of its membrane and connect them to an ESP32 module, which can be reversed at any time.',
      ],
      fr: [
        'Statut : prévu. Pour l\'instant, seule la réflexion de conception est faite, rien n\'est encore construit.',
        'L\'idée est de rendre connectée une cible de fléchettes électronique du commerce, pour que les scores arrivent sur un téléphone et que l\'on puisse lancer les parties depuis celui-ci. Pour ne pas toucher à la cible, le plan est de débrancher les nappes de sa membrane et de les connecter à un module ESP32, ce qui reste réversible à tout moment.',
      ],
    },
  },
  {
    slug: 'sand-simulation',
    title: { en: 'Sand gravity simulation', fr: 'Simulation de gravité du sable' },
    summary: {
      en: 'Physics simulation of falling sand particles.',
      fr: 'Simulation physique de grains de sable qui tombent.',
    },
    context: { en: 'Télécom Saint-Étienne', fr: 'Télécom Saint-Étienne' },
    period: { en: 'Jan – May 2025', fr: 'janv. – mai 2025' },
    stack: { en: ['C#', 'SFML'], fr: ['C#', 'SFML'] },
    body: {
      en: [
        'A school project simulating how grains of sand fall and pile up, rendered with SFML.',
      ],
      fr: [
        'Un projet d\'école qui simule la chute et l\'empilement de grains de sable, rendu avec SFML.',
      ],
    },
  },
  {
    slug: 'bde-website',
    title: { en: 'Student union campaign site', fr: 'Site de campagne d\'une liste BDE' },
    summary: {
      en: 'Showcase web app for a student union campaign.',
      fr: 'Application web vitrine pour la campagne d\'une liste BDE.',
    },
    context: { en: 'Télécom Saint-Étienne', fr: 'Télécom Saint-Étienne' },
    period: { en: 'Dec 2024 – Feb 2025', fr: 'déc. 2024 – févr. 2025' },
    stack: { en: ['Angular', 'TypeScript'], fr: ['Angular', 'TypeScript'] },
    body: {
      en: [
        'A showcase site for the BA\'TSE student union list during the selection week for the following year\'s union.',
        'The preview below is the real site, running inside this page. It is in French.',
      ],
      fr: [
        'Un site vitrine pour la liste BA\'TSE pendant la semaine de sélection pour le bureau des élèves de l\'année suivante.',
        'L\'aperçu ci-dessous est le vrai site, qui tourne dans cette page.',
      ],
    },
    embed: {
      src: '/bde/index.html',
      title: {
        en: 'BDE campaign site (mobile preview)',
        fr: 'Site de la campagne BDE (aperçu mobile)',
      },
      fullscreenHref: '/bde/',
      fullscreenLabel: { en: 'Open full screen', fr: 'Ouvrir en plein écran' },
    },
  },
]

function localize(source: ProjectSource, locale: Locale): Project {
  return {
    slug: source.slug,
    title: source.title[locale],
    summary: source.summary[locale],
    context: source.context[locale],
    period: source.period?.[locale],
    stack: source.stack[locale],
    body: source.body[locale],
    url: source.url,
    links: source.links?.map(link => ({
      href: link.href,
      label: link.label[locale],
      ariaLabel: link.ariaLabel?.[locale],
    })),
    embed: source.embed && {
      src: source.embed.src,
      title: source.embed.title[locale],
      fullscreenHref: source.embed.fullscreenHref,
      fullscreenLabel: source.embed.fullscreenLabel[locale],
    },
    featured: source.featured,
  }
}

export function getProjects(locale: Locale): Project[] {
  return sources.map(source => localize(source, locale))
}

export function findProject(slug: string, locale: Locale): Project | undefined {
  const source = sources.find(project => project.slug === slug)
  return source && localize(source, locale)
}
