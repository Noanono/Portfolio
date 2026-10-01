<script setup lang="ts">
/**
 * Topographic hero: contour lines of a few fixed "mountains" plus one that
 * follows the pointer. Lines are traced with marching squares on a coarse
 * grid and drawn on a canvas. With reduced motion, the map stays still.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Peak { x: number, y: number, height: number, spread: number }

const canvas = ref<HTMLCanvasElement | null>(null)

const CELL = 12 // px between grid samples
const LEVELS = 14 // number of contour lines

// Positions are fractions of the canvas size so the map scales.
const peaks: Peak[] = [
  { x: 0.78, y: 0.32, height: 1, spread: 0.22 },
  { x: 0.62, y: 0.7, height: 0.7, spread: 0.18 },
  { x: 0.95, y: 0.85, height: 0.55, spread: 0.2 },
  { x: 0.18, y: 0.15, height: 0.45, spread: 0.16 },
]

const pointer = { x: 0.5, y: 0.5, target: { x: 0.5, y: 0.5 }, strength: 0, targetStrength: 0 }
let frame = 0
let observer: ResizeObserver | null = null
let reduceMotion = false

function elevation(px: number, py: number, w: number, h: number): number {
  const scale = Math.max(w, h)
  let z = 0
  for (const peak of peaks) {
    const dx = (px - peak.x * w) / scale
    const dy = (py - peak.y * h) / scale
    z += peak.height * Math.exp(-(dx * dx + dy * dy) / (2 * peak.spread * peak.spread))
  }
  if (pointer.strength > 0.001) {
    const dx = (px - pointer.x * w) / scale
    const dy = (py - pointer.y * h) / scale
    z += 0.35 * pointer.strength * Math.exp(-(dx * dx + dy * dy) / (2 * 0.09 * 0.09))
  }
  return z
}

function draw() {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const w = el.clientWidth
  const h = el.clientHeight
  if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const cols = Math.ceil(w / CELL) + 1
  const rows = Math.ceil(h / CELL) + 1
  const grid = new Float32Array(cols * rows)
  let max = 0
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const z = elevation(i * CELL, j * CELL, w, h)
      grid[j * cols + i] = z
      if (z > max) max = z
    }
  }

  const styles = getComputedStyle(el)
  const thin = styles.getPropertyValue('--contour').trim() || '#a9bcc6'
  const strong = styles.getPropertyValue('--contour-strong').trim() || '#6f8a98'

  for (let l = 1; l <= LEVELS; l++) {
    const level = (l / (LEVELS + 1)) * max
    const index = l % 5 === 0 // every fifth line is an index contour, as on real maps
    ctx.strokeStyle = index ? strong : thin
    ctx.lineWidth = index ? 1.4 : 0.9
    ctx.beginPath()
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        traceCell(ctx, grid, cols, i, j, level)
      }
    }
    ctx.stroke()
  }
}

/** Marching squares for one grid cell: adds the contour segment(s) at `level`. */
function traceCell(ctx: CanvasRenderingContext2D, g: Float32Array, cols: number, i: number, j: number, level: number) {
  const a = g[j * cols + i]! // top-left
  const b = g[j * cols + i + 1]! // top-right
  const c = g[(j + 1) * cols + i + 1]! // bottom-right
  const d = g[(j + 1) * cols + i]! // bottom-left
  const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
  if (code === 0 || code === 15) return

  const x = i * CELL
  const y = j * CELL
  const lerp = (p: number, q: number) => (level - p) / (q - p)
  const top: [number, number] = [x + CELL * lerp(a, b), y]
  const right: [number, number] = [x + CELL, y + CELL * lerp(b, c)]
  const bottom: [number, number] = [x + CELL * lerp(d, c), y + CELL]
  const left: [number, number] = [x, y + CELL * lerp(a, d)]

  const seg = (p: [number, number], q: [number, number]) => {
    ctx.moveTo(p[0], p[1])
    ctx.lineTo(q[0], q[1])
  }

  switch (code) {
    case 1: case 14: seg(left, bottom); break
    case 2: case 13: seg(bottom, right); break
    case 3: case 12: seg(left, right); break
    case 4: case 11: seg(top, right); break
    case 5: seg(left, top); seg(bottom, right); break
    case 6: case 9: seg(top, bottom); break
    case 7: case 8: seg(left, top); break
    case 10: seg(top, right); seg(left, bottom); break
  }
}

function tick() {
  const ease = 0.12
  pointer.x += (pointer.target.x - pointer.x) * ease
  pointer.y += (pointer.target.y - pointer.y) * ease
  pointer.strength += (pointer.targetStrength - pointer.strength) * ease
  draw()
  const settled = Math.abs(pointer.target.x - pointer.x) < 0.001
    && Math.abs(pointer.target.y - pointer.y) < 0.001
    && Math.abs(pointer.targetStrength - pointer.strength) < 0.001
  frame = settled ? 0 : requestAnimationFrame(tick)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick)
}

function onPointerMove(event: PointerEvent) {
  if (reduceMotion || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  pointer.target.x = (event.clientX - rect.left) / rect.width
  pointer.target.y = (event.clientY - rect.top) / rect.height
  pointer.targetStrength = 1
  schedule()
}

function onPointerLeave() {
  pointer.targetStrength = 0
  schedule()
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  draw()
  observer = new ResizeObserver(() => draw())
  if (canvas.value) observer.observe(canvas.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <canvas
    ref="canvas"
    class="contour-map"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  />
</template>

<style scoped>
.contour-map {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
}
</style>
