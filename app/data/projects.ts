// Everything about a project that does not depend on the language. The texts
// (title, summary, description, labels) are in each language file in
// `app/i18n/locales`, keyed by `slug`.
import { defaultLanguage, findLocale } from '~/i18n'

interface ProjectBase {
  slug: string
  /** The project's own page, shown as a link under the description. */
  url?: string
  /** External links opened in a new tab. `key` finds the label in the language files. */
  links?: readonly { key: string, href: string }[]
  /** A site shown in a phone-shaped frame on the project page. */
  embed?: {
    /** Path of the site served by this portfolio, e.g. `/bde/index.html`. */
    src: string
    /** Where "open full screen" leads. */
    fullscreenHref: string
  }
  /** Shown on the home page. */
  featured?: boolean
}

export const projectBases = [
  {
    slug: 'e-totem',
    links: [
      {
        key: 'website',
        href: 'https://www.e-totem.fr/#/home/ou_se_recharger',
      },
    ],
    featured: true,
  },
  {
    slug: 'amagis',
    links: [
      {
        key: 'website',
        href: 'https://www.amagis.fr/',
      },
    ],
    featured: true,
  },
  {
    slug: 'line-following-car',
    featured: true,
  },
  {
    slug: 'portfolio-site',
    url: 'https://github.com/Noanono/Portfolio',
    featured: true,
  },
  {
    slug: 'camp-boat',
    links: [
      {
        key: 'website',
        href: 'https://camp-boat.fr/',
      },
    ],
  },
  {
    slug: '3d-portfolio',
  },
  {
    slug: 'connected-dartboard',
  },
  {
    slug: 'sand-simulation',
  },
  {
    slug: 'bde-website',
    embed: {
      src: '/bde/index.html',
      fullscreenHref: '/bde/',
    },
  },
] as const satisfies readonly ProjectBase[]

export type ProjectSlug = (typeof projectBases)[number]['slug']

export interface ProjectLink {
  href: string
  /** Visible text of the link. */
  label: string
  /** Spoken label when the visible text alone is not enough. Must start with the visible text. */
  ariaLabel?: string
}

export interface ProjectEmbed {
  src: string
  /** Accessible title of the frame. */
  title: string
  fullscreenHref: string
  fullscreenLabel: string
}

/** A project in one language, as the pages use it. */
export interface Project {
  slug: string
  title: string
  summary: string
  context: string
  period?: string
  stack: string[]
  body: string[]
  url?: string
  links?: ProjectLink[]
  embed?: ProjectEmbed
  featured?: boolean
}

function localize(base: ProjectBase, code: string): Project {
  const locale = findLocale(code) ?? defaultLanguage
  const texts = (locale.projects as Record<string, (typeof locale.projects)[ProjectSlug] | undefined>)[base.slug]
  if (!texts) {
    throw new Error(`Language "${locale.code}" has no texts for the project "${base.slug}".`)
  }
  return {
    slug: base.slug,
    title: texts.title,
    summary: texts.summary,
    context: texts.context,
    period: texts.period,
    stack: texts.stack,
    body: texts.body,
    url: base.url,
    links: base.links?.map(link => {
      const text = texts.links?.[link.key]
      if (!text) {
        throw new Error(`Language "${locale.code}": project "${base.slug}" has no label for its "${link.key}" link.`)
      }
      return { href: link.href, label: text.label, ariaLabel: text.ariaLabel }
    }),
    embed: base.embed && (() => {
      if (!texts.embed) {
        throw new Error(`Language "${locale.code}": project "${base.slug}" has no texts for its embedded site.`)
      }
      return { ...texts.embed, src: base.embed.src, fullscreenHref: base.embed.fullscreenHref }
    })(),
    featured: base.featured,
  }
}

export function getProjects(code: string): Project[] {
  return projectBases.map(base => localize(base, code))
}

export function findProject(slug: string, code: string): Project | undefined {
  const base = projectBases.find(project => project.slug === slug)
  return base && localize(base, code)
}
