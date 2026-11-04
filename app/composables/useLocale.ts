import { cvPath, localeFromPath, localizedPath } from '~/i18n/locale'
import type { Locale } from '~/i18n/locale'
import { messages } from '~/i18n/messages'

/** Current language, derived from the URL (`/fr/...` is French, the rest English). */
export function useLocale() {
  const route = useRoute()

  const locale = computed(() => localeFromPath(route.path))
  const altLocale = computed<Locale>(() => (locale.value === 'en' ? 'fr' : 'en'))
  /** Same page in the other language, used by the language switch. */
  const altPath = computed(() => localizedPath(route.path, altLocale.value))
  /** Prefixes an internal path with the current language. */
  const localePath = (path: string) => localizedPath(path, locale.value)
  const t = computed(() => messages[locale.value])
  /** CV in the language of the page. */
  const cvHref = computed(() => cvPath(locale.value))

  return { locale, altLocale, altPath, localePath, cvHref, t }
}
