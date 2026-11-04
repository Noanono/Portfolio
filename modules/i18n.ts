// Build-time side of the languages. Everything is derived from the files in
// `app/i18n/locales`, so a new language needs nothing here:
//
// - the `/:lang/` route accepts exactly those languages (anything else is a 404)
// - the home page of each language is prerendered
// - `sitemap.xml` lists every page with its alternates in all languages
import { readdirSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import { defaultLocale, siteUrl } from '../app/i18n/config'
import { absoluteUrl, localeCode, localeSegment, localizedPath } from '../app/i18n/url'

interface RouteLike {
  path: string
  children?: RouteLike[]
}

export default defineNuxtModule({
  meta: { name: 'i18n' },
  setup(_options, nuxt) {
    const directory = resolve(nuxt.options.rootDir, 'app/i18n/locales')
    const segments = readdirSync(directory)
      .filter(file => file.endsWith('.ts'))
      .map(file => file.replace(/\.ts$/, ''))
      .sort()

    if (!segments.includes(localeSegment(defaultLocale))) {
      throw new Error(`The default language "${defaultLocale}" has no file in app/i18n/locales.`)
    }

    // Pages live in app/pages/[lang]/. Restrict the parameter to the real
    // languages so that /xx/about/ and /projects/about/ are not pages.
    nuxt.hook('pages:extend', (pages) => {
      const restrict = (list: RouteLike[]) => {
        for (const page of list) {
          page.path = page.path.replace(':lang()', `:lang(${segments.join('|')})`)
          if (page.children) restrict(page.children)
        }
      }
      restrict(pages as RouteLike[])
    })

    nuxt.hook('nitro:config', (config) => {
      config.prerender ||= {}
      config.prerender.routes = [
        ...(config.prerender.routes ?? []),
        '/',
        ...segments.map(segment => `/${segment}`),
      ]
    })

    nuxt.hook('nitro:init', (nitro) => {
      nitro.hooks.hook('prerender:done', async ({ prerenderedRoutes }) => {
        const codes = segments.map(localeCode)
        const neutralPaths = new Set<string>()
        for (const { route } of prerenderedRoutes ?? []) {
          const [, first = '', ...rest] = route.split('/')
          // Only pages: skip files such as _payload.json.
          if (!segments.includes(first) || /\.[a-z0-9]+$/i.test(route)) continue
          neutralPaths.add(`/${rest.join('/')}`.replace(/\/+$/, '') || '/')
        }

        const urls = [...neutralPaths].sort().map((path) => {
          const alternates = [
            ...codes.map(code => ({ hreflang: code, href: absoluteUrl(localizedPath(path, code)) })),
            { hreflang: 'x-default', href: absoluteUrl(localizedPath(path, defaultLocale)) },
          ]
          return codes.map(code => [
            '  <url>',
            `    <loc>${absoluteUrl(localizedPath(path, code))}</loc>`,
            ...alternates.map(({ hreflang, href }) =>
              `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`),
            '  </url>',
          ].join('\n')).join('\n')
        })

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urls,
          '</urlset>',
          '',
        ].join('\n')

        const publicDir = nitro.options.output.publicDir
        await mkdir(publicDir, { recursive: true })
        await writeFile(join(publicDir, 'sitemap.xml'), xml)
        nitro.logger.info(`Sitemap: ${neutralPaths.size} pages in ${codes.length} languages (${siteUrl}/sitemap.xml)`)
      })
    })
  },
})
