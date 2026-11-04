// Everything about a project that does not depend on the language. The texts
// (title, summary, description, labels) are in each language file in
// `app/i18n/locales`, keyed by `slug`.
import { defaultLanguage, findLocale } from '~/i18n'

/**
 * The kinds of external link a project can have. The wording of each kind is
 * written once per language, in `messages.projects.links`.
 */
export type LinkKind = 'website' | 'repo'

interface ProjectBase {
  slug: string
  /**
   * External links, opened in a new tab. The label comes from the language
   * files according to `kind`; `name` is what replaces `{name}` in it (the
   * project or product name, the same in every language).
   */
  links?: readonly { kind: LinkKind, href: string, name?: string }[]
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
        kind: 'website',
        name: 'E-TOTEM',
        href: 'https://www.e-totem.fr/#/home/ou_se_recharger',
      },
    ],
    featured: true,
  },
  {
    slug: 'amagis',
    links: [
      {
        kind: 'website',
        name: 'AMAGiS',
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
    links: [
      {
        kind: 'repo',
        href: 'https://github.com/Noanono/Portfolio',
      },
    ],
    featured: true,
  },
  {
    slug: 'camp-boat',
    links: [
      {
        kind: 'website',
        name: 'Camp-Boat',
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
    links: base.links?.map(link => {
      const fill = (text: string) => text.replaceAll('{name}', link.name ?? texts.title)
      const text = locale.messages.projects.links[link.kind]
      return { href: link.href, label: fill(text.label), ariaLabel: fill(text.ariaLabel) }
    }),
    embed: base.embed && (() => {
      if (!texts.embed) {
        throw new Error(`Language "${locale.code}": project "${base.slug}" has no texts for its embedded site.`)
      }
      return {
        title: texts.embed.title,
        src: base.embed.src,
        fullscreenHref: base.embed.fullscreenHref,
        fullscreenLabel: locale.messages.projects.openFullScreen,
      }
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
