// Production dependency audit used by CI (`npm run audit:prod`).
//
// Fails on any high or critical advisory, except the ones listed in ALLOWED
// below. Each exemption is a vulnerability in build/dev tooling pulled in by
// Nuxt (nitropack, @nuxt/cli, @nuxt/devtools). None of that code ships in the
// generated static site. Remove an entry as soon as a fixed version exists.
import { execFileSync } from 'node:child_process'

const ALLOWED = {
  'GHSA-vfj7-8cjw-p6xm': 'braces <=3.0.3, no patched version yet (build tooling: globby/fast-glob)',
  'GHSA-86w9-cpqp-85rv': 'node-forge <=1.4.0, no patched version yet (nitropack/@nuxt/cli dev server)',
  'GHSA-858h-whjf-mvg5': 'simple-git <=3.36.0, used by @nuxt/devtools (dev only); 4.x breaks Nuxt devtools',
  'GHSA-g4wm-2vf7-vfgr': 'simple-git <=3.36.0, used by @nuxt/devtools (dev only); 4.x breaks Nuxt devtools',
  'GHSA-x6jw-m9v5-85vh': 'simple-git <4.0.1, used by @nuxt/devtools (dev only); 4.x breaks Nuxt devtools',
  'GHSA-v5rq-49vh-5v5c': '@simple-git/argv-parser <2.0.1, via simple-git (dev only)',
}

let raw
try {
  raw = execFileSync('npm', ['audit', '--omit=dev', '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
} catch (error) {
  // npm audit exits non-zero when it finds vulnerabilities; the JSON is still on stdout.
  raw = error.stdout
  if (!raw) throw error
}

const report = JSON.parse(raw)
if (report.error) {
  console.error(`npm audit failed: ${report.error.summary ?? JSON.stringify(report.error)}`)
  process.exit(1)
}

const blocking = new Map()
const exempted = new Map()
for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
  for (const via of vulnerability.via) {
    if (typeof via === 'string' || !['high', 'critical'].includes(via.severity)) continue
    const id = via.url.split('/').pop()
    const entry = `${via.severity.padEnd(8)} ${id}  ${via.name}: ${via.title}`
    if (id in ALLOWED) exempted.set(id, entry)
    else blocking.set(id, entry)
  }
}

for (const [id, entry] of exempted) console.log(`allowed   ${entry}\n          -> ${ALLOWED[id]}`)
if (blocking.size > 0) {
  console.error('\nBlocking advisories (fix them, or exempt them in scripts/audit.mjs with a reason):')
  for (const entry of blocking.values()) console.error(`  ${entry}`)
  process.exit(1)
}
console.log(`\nAudit OK: no blocking high/critical advisory (${exempted.size} exempted).`)
