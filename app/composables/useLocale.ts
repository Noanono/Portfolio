import { defaultLanguage, localeFromSegment, locales, stripLocale } from '~/i18n'
import { localizedPath } from '~/i18n/url'

/** Links end with a slash, the form the server serves, so that no link goes through a redirect. */
const asLink = (path: string) => `${path.replace(/\/+$/, '')}/`

/** Current language, taken from the `/:lang/` part of the URL. */
export function useLocale() {
  const route = useRoute()

  const current = computed(() => localeFromSegment(String(route.params.lang ?? '')) ?? defaultLanguage)
  const locale = computed(() => current.value.code)
  const t = computed(() => current.value.messages)
  /** Path of the page without its language prefix: `/about`. */
  const neutralPath = computed(() => stripLocale(route.path))
  /** Every other language, with the path of the same page in it. Used by the language switch. */
  const others = computed(() => locales
    .filter(language => language.code !== locale.value)
    .map(language => ({ ...language, path: asLink(localizedPath(neutralPath.value, language.code)) })))
  /** Prefixes an internal path with the current language. */
  const localePath = (path: string) => asLink(localizedPath(path, locale.value))
  /** CV in the language of the page, or in the default language if there is none. */
  const cvHref = computed(() => current.value.cv ?? defaultLanguage.cv ?? '')

  return { locale, t, neutralPath, others, localePath, cvHref }
}
