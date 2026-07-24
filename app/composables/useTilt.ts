// =============================================================================
// useTilt — pointer-driven 3D tilt for cards. Writes the pointer position to
// CSS custom properties (--tilt-x / --tilt-y / --pointer-x / --pointer-y); all
// visual styling stays in SCSS (no inline style rules). Disabled for touch and
// reduced-motion users. This is the "interactive & premium" feel the brief asks
// for, kept accessible and cheap (rAF-throttled).
// =============================================================================

export const useTilt = (max = 6) => {
  const el = ref<HTMLElement | null>(null)
  let frame = 0
  let enabled = true

  const onMove = (event: PointerEvent) => {
    if (!enabled || !el.value) return
    if (frame) cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const rect = el.value!.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      el.value!.style.setProperty('--tilt-x', `${(0.5 - py) * max}deg`)
      el.value!.style.setProperty('--tilt-y', `${(px - 0.5) * max}deg`)
      el.value!.style.setProperty('--pointer-x', `${px * 100}%`)
      el.value!.style.setProperty('--pointer-y', `${py * 100}%`)
    })
  }

  const reset = () => {
    if (!el.value) return
    el.value.style.setProperty('--tilt-x', '0deg')
    el.value.style.setProperty('--tilt-y', '0deg')
  }

  onMounted(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    enabled = !reduce && !coarse
  })

  return { el, onMove, reset }
}
