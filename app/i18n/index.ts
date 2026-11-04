// The languages of the site. Each file in `./locales` is one language and is
// found automatically: adding `de.ts` there is all it takes to add German (see
// doc/i18n.md). Routes, hreflang, canonical, the language switch and the sitemap
// all come from this list.
import { defaultLocale } from './config'
import type { LocaleDefinition } from './types'
import { localeCode, localizedPath } from './url'

export { defaultLocale }

export interface Locale extends LocaleDefinition {
  /** Language code, e.g. `fr` or `pt-BR`. Used in hreflang and `<html lang>`. */
  code: string
  /** URL prefix, e.g. `fr` or `pt-br`. */
  segment: string
  /** Short form for narrow screens, e.g. `FR`. */
  short: string
}

const files = import.meta.glob<{ default: LocaleDefinition }>('./locales/*.ts', { eager: true })

const found: Locale[] = Object.entries(files).map(([path, file]) => {
  const segment = path.replace(/^.*\//, '').replace(/\.ts$/, '')
  const code = localeCode(segment)
  return { ...file.default, code, segment, short: code.split('-')[0]!.toUpperCase() }
})

const fallback = found.find(locale => locale.code === defaultLocale)
if (!fallback) {
  throw new Error(`The default language "${defaultLocale}" has no file in app/i18n/locales.`)
}

/** All languages, the default one first, then alphabetical. */
export const locales: Locale[] = found.sort((a, b) =>
  a.code === defaultLocale ? -1 : b.code === defaultLocale ? 1 : a.code.localeCompare(b.code))

export const defaultLanguage: Locale = fallback

export function findLocale(code: string): Locale | undefined {
  return locales.find(locale => locale.code === code)
}

export function localeFromSegment(segment: string): Locale | undefined {
  return locales.find(locale => locale.segment === segment.toLowerCase())
}

/** Removes the language prefix: `/fr/about/` becomes `/about`, `/fr` becomes `/`. */
export function stripLocale(path: string): string {
  const [, first = '', ...rest] = path.split('/')
  const remaining = localeFromSegment(first) ? rest : [first, ...rest]
  const stripped = `/${remaining.join('/')}`.replace(/\/+$/, '')
  return stripped === '' ? '/' : stripped
}

/** Best language for a visitor, from the browser's list (`navigator.languages`). */
export function pickLocale(preferred: readonly string[]): Locale {
  for (const tag of preferred) {
    const wanted = tag.toLowerCase()
    const language = wanted.split('-')[0]
    const match = locales.find(locale => locale.segment === wanted)
      ?? locales.find(locale => locale.segment === language)
      ?? locales.find(locale => locale.segment.split('-')[0] === language)
    if (match) return match
  }
  return defaultLanguage
}

/** Path of the same page in each language, for the switch and hreflang. */
export function alternatesOf(path: string): { locale: Locale, path: string }[] {
  const neutral = stripLocale(path)
  return locales.map(locale => ({ locale, path: localizedPath(neutral, locale.code) }))
}
