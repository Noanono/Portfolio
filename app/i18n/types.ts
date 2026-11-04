import type { LinkKind, ProjectSlug } from '~/data/projects'

export interface TimelineItem {
  period: string
  title: string
  place: string
  detail?: string
}

// Every string shown by the layout and the pages lives here, once per language.
// `Record<Locale, Messages>` makes TypeScript fail the build if a key is
// missing in one of the languages. Project texts are in `app/data/projects.ts`.
export interface Messages {
  site: {
    skip: string
    navLabel: string
    projects: string
    about: string
    contact: string
    footer: string
    /** Label of the footer link to the CV PDF. */
    cv: string
    /** Accessible name of the language switch, e.g. "Language". */
    languageLabel: string
  }
  home: {
    title: string
    description: string
    role: string
    availability: string
    search: string
    seeProjects: string
    emailMe: string
    downloadCv: string
    selected: string
    allProjects: string
  }
  projects: {
    title: string
    heading: string
    description: string
    lead: string
    back: string
    technologies: string
    context: string
    when: string
    builtWith: string
    /**
     * Text of each kind of project link, written once per language.
     * `{name}` is replaced by the product name (or the project title).
     * `ariaLabel` must start with `label` and say the link opens in a new tab.
     */
    links: Record<LinkKind, { label: string, ariaLabel: string }>
    openFullScreen: string
  }
  about: {
    title: string
    heading: string
    description: string
    intro: string[]
    experienceHeading: string
    educationHeading: string
    skillsHeading: string
    languagesHeading: string
    experience: TimelineItem[]
    education: TimelineItem[]
    skills: { name: string, items: string }[]
    languages: { name: string, level: string }[]
  }
}

/** Everything about a project that has to be written in each language. */
export interface ProjectTexts {
  title: string
  /** One sentence, shown in the project list. */
  summary: string
  /** Where the project happened: employer, client or school. */
  context: string
  period?: string
  stack: string[]
  /** Longer description for the detail page, one paragraph per entry. */
  body: string[]
  /** Texts of the embedded site, for projects that have one. */
  embed?: { title: string }
}

/**
 * A language of the site: one file in `app/i18n/locales`. The file name is the
 * language code in lower case (`de.ts`, `pt-br.ts`) and gives the URL prefix
 * (`/de/`, `/pt-br/`) and the hreflang code (`de`, `pt-BR`).
 */
export interface LocaleDefinition {
  /** Name of the language, written in that language. Shown in the language switch. */
  name: string
  /** CV PDF in this language. The default language's CV is used when missing. */
  cv?: string
  messages: Messages
  /** One entry per project. TypeScript fails the build if one is missing. */
  projects: Record<ProjectSlug, ProjectTexts>
}

/** Gives the editor and the type checker the shape of a language file. */
export function defineLocale(definition: LocaleDefinition): LocaleDefinition {
  return definition
}
