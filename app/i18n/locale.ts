// The site is served in English at the root and in French under /fr.
// These helpers are pure so they can be used in components, composables and
// build-time code alike.
export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Origin used for absolute URLs such as hreflang alternates. */
export const siteUrl = 'https://noah.soler-pro.fr'

const FRENCH_PREFIX = /^\/fr(?=\/|$)/

export function localeFromPath(path: string): Locale {
  return FRENCH_PREFIX.test(path) ? 'fr' : 'en'
}

/** Removes the locale prefix: '/fr/about' becomes '/about', '/fr' becomes '/'. */
export function stripLocale(path: string): string {
  const stripped = path.replace(FRENCH_PREFIX, '').replace(/\/+$/, '')
  return stripped === '' ? '/' : stripped
}

/**
 * Public URL of a page. Cloudflare serves the generated folders with a trailing
 * slash, so alternates point there directly instead of through a redirect.
 */
export function absoluteUrl(path: string): string {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}/`
}

/** Path of the same page in the given language. */
export function localizedPath(path: string, locale: Locale): string {
  const clean = stripLocale(path)
  if (locale === 'en') return clean
  return clean === '/' ? '/fr' : `/fr${clean}`
}
