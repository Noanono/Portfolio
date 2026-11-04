// Checks the generated site (.output/public) against the multilingual SEO rules
// the site follows (https://seaudit.fr/fr/blog/hreflang-seo-multilingue-international-2026):
//
// - one sub-directory per language
// - every page lists itself and all its translations (hreflang), plus x-default
// - reciprocity: if A points to B, B points to A
// - absolute URLs with the same trailing slash as the canonical, never redirected
// - the canonical points to the page itself, in its own language
// - <head> and sitemap.xml say the same thing
//
// Run after `npm run generate`. Exits with 1 and lists every problem found.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('.output/public')
const config = readFileSync('app/i18n/config.ts', 'utf8')
const siteUrl = /siteUrl = '([^']+)'/.exec(config)?.[1]
const defaultLocale = /defaultLocale = '([^']+)'/.exec(config)?.[1]
if (!siteUrl || !defaultLocale) throw new Error('Cannot read siteUrl and defaultLocale from app/i18n/config.ts')

const segments = readdirSync('app/i18n/locales').filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, '')).sort()
const codeOf = (segment) => {
  const [language, ...rest] = segment.split('-')
  return [language, ...rest.map(p => p.length === 2 ? p.toUpperCase() : p[0].toUpperCase() + p.slice(1))].join('-')
}
const codes = segments.map(codeOf)
const defaultCode = codeOf(defaultLocale.toLowerCase())

const errors = []
const fail = (where, message) => errors.push(`${where}: ${message}`)

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]))
}
function links(html) {
  return [...html.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0]))
}

// --- collect the pages: every index.html under a language directory
const pages = new Map() // url -> { path, code, neutral, canonical, alternates }
function walk(dir, relative) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(join(dir, entry.name), `${relative}/${entry.name}`)
    else if (entry.name === 'index.html') {
      const path = relative === '' ? '/' : `${relative}/`
      const segment = path.split('/')[1]
      const html = readFileSync(join(dir, entry.name), 'utf8')
      const own = links(html)
      pages.set(`${siteUrl}${path}`, {
        path,
        segment,
        code: codeOf(segment),
        neutral: `/${path.split('/').slice(2).join('/')}`,
        lang: /<html[^>]*\blang="([^"]*)"/.exec(html)?.[1],
        canonical: own.filter(l => l.rel === 'canonical').map(l => l.href),
        alternates: own.filter(l => l.rel === 'alternate' && l.hreflang),
      })
    }
  }
}
for (const segment of segments) {
  if (!existsSync(join(root, segment))) fail(segment, 'no generated directory for this language')
  else walk(join(root, segment), `/${segment}`)
}
if (pages.size === 0) throw new Error('No language page found in .output/public. Run `npm run generate` first.')

const urlOf = (code, neutral) => `${siteUrl}/${code.toLowerCase()}${neutral === '/' ? '' : neutral}/`.replace(/\/+$/, '/')
const hreflangFormat = /^([a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?|x-default)$/

for (const [url, page] of pages) {
  const where = page.path
  if (page.lang !== page.code) fail(where, `<html lang="${page.lang}"> should be "${page.code}"`)
  if (page.canonical.length !== 1) fail(where, `expected one canonical, found ${page.canonical.length}`)
  else if (page.canonical[0] !== url) fail(where, `canonical is ${page.canonical[0]}, expected ${url}`)

  const byLang = new Map()
  for (const { hreflang, href } of page.alternates) {
    if (byLang.has(hreflang)) fail(where, `hreflang "${hreflang}" appears twice`)
    byLang.set(hreflang, href)
    if (!hreflangFormat.test(hreflang)) fail(where, `"${hreflang}" is not a valid hreflang code`)
    if (!href.startsWith(`${siteUrl}/`)) fail(where, `${hreflang}: ${href} is not an absolute URL on ${siteUrl}`)
    if (/[?#]/.test(href) || !href.endsWith('/')) fail(where, `${hreflang}: ${href} must end with a slash, without query or fragment`)
    if (!pages.has(href)) fail(where, `${hreflang}: ${href} is not a generated page (a redirect or a 404)`)
  }
  for (const code of [...codes, 'x-default']) {
    if (!byLang.has(code)) fail(where, `missing hreflang "${code}"`)
  }
  for (const code of byLang.keys()) {
    if (code !== 'x-default' && !codes.includes(code)) fail(where, `hreflang "${code}" is not a language of the site`)
  }
  if (byLang.get(page.code) !== url) fail(where, `the page must list itself (hreflang "${page.code}")`)
  if (byLang.get('x-default') !== urlOf(defaultCode, page.neutral)) {
    fail(where, `x-default should be ${urlOf(defaultCode, page.neutral)}`)
  }
  for (const code of codes) {
    const href = byLang.get(code)
    if (!href) continue
    if (href !== urlOf(code, page.neutral)) fail(where, `hreflang "${code}" should point to ${urlOf(code, page.neutral)}, not ${href}`)
    // Reciprocity: the target must point back to this page, under this page's language.
    const back = pages.get(href)?.alternates.find(l => l.hreflang === page.code)?.href
    if (pages.has(href) && back !== url) fail(where, `${href} does not point back to ${url} (hreflang "${page.code}")`)
  }
}

// --- sitemap.xml must say the same as the <head> of the pages
const sitemapFile = join(root, 'sitemap.xml')
if (!existsSync(sitemapFile)) fail('sitemap.xml', 'missing')
else {
  const xml = readFileSync(sitemapFile, 'utf8')
  const entries = new Map()
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1]
    const alternates = new Map([...block.matchAll(/<xhtml:link\b[^>]*>/g)].map(m => attributes(m[0])).map(a => [a.hreflang, a.href]))
    if (entries.has(loc)) fail('sitemap.xml', `${loc} appears twice`)
    entries.set(loc, alternates)
  }
  for (const [url, page] of pages) {
    const entry = entries.get(url)
    if (!entry) { fail('sitemap.xml', `${url} is missing`); continue }
    const head = new Map(page.alternates.map(l => [l.hreflang, l.href]))
    const same = head.size === entry.size && [...head].every(([code, href]) => entry.get(code) === href)
    if (!same) fail('sitemap.xml', `alternates of ${url} differ from the page's <head>`)
  }
  for (const url of entries.keys()) {
    if (!pages.has(url)) fail('sitemap.xml', `${url} is not a generated page`)
  }
}

// --- the root has no content: it only sends visitors to their language
const rootHtml = existsSync(join(root, 'index.html')) ? readFileSync(join(root, 'index.html'), 'utf8') : ''
if (!/<meta name="robots" content="[^"]*noindex/.test(rootHtml)) fail('/', 'the language gateway must be noindex')
if (links(rootHtml).some(l => l.hreflang)) fail('/', 'the language gateway must not carry hreflang <link> tags')

const robots = existsSync(join(root, 'robots.txt')) ? readFileSync(join(root, 'robots.txt'), 'utf8') : ''
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail('robots.txt', 'must declare the sitemap')
if (/^\s*Disallow:\s*\/\s*$/m.test(robots) || segments.some(s => new RegExp(`Disallow:\\s*/${s}\\b`).test(robots))) {
  fail('robots.txt', 'must not block a language')
}

if (errors.length > 0) {
  console.error(`SEO check failed (${errors.length}):`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}
console.log(`SEO check OK: ${pages.size} pages in ${codes.length} languages (${codes.join(', ')}).`)
