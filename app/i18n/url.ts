// URL rules shared by the pages and the build. Plain TypeScript with no Vue or
// Nuxt imports. Every language has its own sub-directory, including the default
// one: /en/about/, /fr/about/, /pt-br/about/.
import { siteUrl } from './config'

/** URL prefix of a language: the code in lower case (`pt-BR` becomes `pt-br`). */
export function localeSegment(code: string): string {
  return code.toLowerCase()
}

/**
 * Language code (BCP 47, as hreflang and `<html lang>` expect it) from the file
 * name or URL prefix: `pt-br` becomes `pt-BR`, `zh-hant` becomes `zh-Hant`.
 */
export function localeCode(segment: string): string {
  const [language = '', ...rest] = segment.toLowerCase().split('-')
  return [
    language,
    ...rest.map(part => part.length === 2
      ? part.toUpperCase()
      : part.charAt(0).toUpperCase() + part.slice(1)),
  ].join('-')
}

/** Path of a page in a language. `localizedPath('/about', 'fr')` is `/fr/about`, `'/'` gives `/fr`. */
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
