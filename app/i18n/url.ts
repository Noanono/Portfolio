// URL rules shared by the pages and the build. Plain TypeScript with no Vue or
// Nuxt imports. Every language has its own sub-directory, including the default
// one, named after its language and region: /en-us/about/, /fr-fr/about/,
// /fr-be/about/.
import { siteUrl } from './config'

/**
 * A language is always a language and a region (`en-US`, `fr-BE`, `es-MX`), as
 * hreflang expects. Language files are named in lower case: `en-us.ts`.
 */
export const localeFilePattern = /^[a-z]{2,3}-[a-z]{2}$/

export function assertLocaleFile(segment: string): void {
  if (!localeFilePattern.test(segment)) {
    throw new Error(
      `app/i18n/locales/${segment}.ts: a language file is named <language>-<region> in lower case, `
      + `like en-us.ts, fr-fr.ts or fr-be.ts (hreflang needs both).`,
    )
  }
}

/** URL prefix of a language: the code in lower case (`en-US` becomes `en-us`). */
export function localeSegment(code: string): string {
  return code.toLowerCase()
}

/**
 * Language code (BCP 47, as hreflang and `<html lang>` expect it) from the file
 * name or URL prefix: `en-us` becomes `en-US`, `fr-be` becomes `fr-BE`.
 */
export function localeCode(segment: string): string {
  const [language = '', region = ''] = segment.toLowerCase().split('-')
  return `${language}-${region.toUpperCase()}`
}

/** Path of a page in a language. `localizedPath('/about', 'fr-FR')` is `/fr-fr/about`, `'/'` gives `/fr-fr`. */
export function localizedPath(path: string, code: string): string {
  const clean = path.replace(/\/+$/, '')
  return `/${localeSegment(code)}${clean === '' ? '' : clean}`
}

/**
 * Public URL of a page. It ends with a slash because that is the form Cloudflare
 * serves; canonical and hreflang must match it exactly and never go through a
 * redirect.
 */
export function absoluteUrl(path: string): string {
  const clean = path.replace(/\/+$/, '')
  return `${siteUrl}${clean}/`
}
